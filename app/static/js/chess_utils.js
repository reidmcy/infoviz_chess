function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function separation(a, b) {
    if (a.parent == b.parent) {
        return Math.max(a.value, b.value) + .3;
    } else {
        return 2;
    }
}

function flatten(root) {
  var nodes = [],
    i = 0;

  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (node._children) node._children.forEach(recurse);
    if (!node.id) node.id = ++i;
    nodes.push(node);
  }

  recurse(root);
  return nodes;
}

function interpolateColor(color1, color2, factor) {

    var result = "rgb("
    for (var i = 0; i < 3; i++) {
        result += Math.round(color1[i] + factor * (color2[i] - color1[i]));
        if (i < 2) {
            result += ', '
        }
    }
    return result + ')';
};

function transition_over() {
  flag_mouse = false;
}

//Redraw for zoom
function redraw() {
  svg.attr(
    "transform",
    "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")"
  );
}

function nodeWidth(d) {
    if (isNaN(d.primary) || d.primary) {
        return minWidth + rectW;
    } else {
        return minWidth + rectW * d.value;
    }
}

function draw_node(node){
    node.append("rect")
      .attr("width", nodeWidth)
      .attr("height", rectH)
      .attr("stroke", node_line_colour)
      .attr("stroke-width", 1)
      .style("fill", function(d) {
          return interpolateColor(high_val_colour, low_val_colour, d.value);
      });
}

// Toggle children on click.
function click(d, root) {
  flag_mouse = true;
  if (d.children) {
    d._children = d.children;
    d.children = null;
    update(d, root);
  } else {
      d3.json('/board/' + d.fen, function(data) {
                    d.children = data;
                    d._children = null;
                    update(d, root);
                });
  }
}

function mouseover(d, root, node) {
  // Use D3 to select element, change color and size
  if (!flag_mouse) {
    d3.select(node).attr({
      fill: "orange"
    });
    tooltip
   .html(
     "<div class='w3-container'  align='center'><h2>Node info</h2><ul class='w3-ul w3-large'><li> Node name: " +
       d.name +
       "</li><li>Is main line: " +
       d.primary +
       "</li><li>Value: " +
       d.value.toFixed(2) +
       "</li>Number of children: " +
       d.num_moves +
       "<li></li></ul></div>"
   )
      .style("visibility", "visible");
    var board1 = Chessboard('board', d.fen);
    while (d.parent) {
      d.color = stroke_select_colour;
      d = d.parent;
    }

    d3.selectAll("path").style("stroke", function(d) { return d.target.color;});
    update(d, root);
  }
}

function mouseout(d, root, node) {
  if (!flag_mouse) {
    d3.select(node).attr({
      fill: node_unselect_colour
    });
    tooltip.style("visibility", "hidden");
    svg.selectAll("path.link").style("stroke", function(d) {
      d.target.color = stroke_not_select_colour;
      return d.target.color;
    });
    update(d, root);
  }
}

function nodeText(d) {
    if (d._children && Object.keys(d._children).length > 0) {
        return d.name;// + ' (' + Object.keys(d._children).length + ')';
    } else {
        return  d.name;
    }
}

function update(source, root) {
  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();
  var links = tree.links(nodes);
  // Runs the tree layout, returning the array of nodes associated with the specified root node
  // Normalize for fixed-depth.
  nodes.forEach(function(d) {
    d.y = d.depth * dist_between_nodes;
  });

  // Update the nodes…
  var node = svg.selectAll("g.node").data(nodes, function(d) {
    return d.id || (d.id = ++i);
  });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + source.x0 + "," + source.y0 + ")";
    })
    .on("click", function(d) { click(d, root)})
    .on("mouseover", function(d) { mouseover(d, root, this) } )
    .on("mouseout", function(d) { mouseout(d, root, this)} );

  draw_node(nodeEnter)

  nodeEnter
    .append("text")
    .attr("x", function(d) {return nodeWidth(d) / 2;} )
    .attr("y", rectH / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("fill-opacity", 1)
    .text(nodeText);

  // Transition nodes to their new position.
  var nodeUpdate = node
    .transition()
    .each("end", transition_over)
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node
    .exit()
    .transition()
    .duration(duration)
    .attr("transform", function(d) {
      return "translate(" + source.x + "," + source.y + ")";
    })
    .remove();

  nodeExit
    .select("rect")
    .attr("width", nodeWidth )
    .attr("height", rectH)
    .attr("stroke", node_unselect_colour)
    .attr("stroke-width", 1);

  nodeExit.select("text");

  // Update the links…
  var link = svg.selectAll("path.link").data(links, function(d) {
    return d.target.id;
  });
  // Enter any new links at the parent's previous position.
  link
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .style("stroke-width", function(d) { return  d.target.value * 5;})
    .attr("d", function(d) {
      var o = {
        x: source.x0,
        y: source.y0
      };
      return diagonal({
        source: o,
        target: o
      });
    });

  // Transition links to their new position.
  link
    .transition()
    .duration(duration)
    .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link
    .exit()
    .transition()
    .duration(duration)
    .attr("d", function(d) {
      var o = {
        x: source.x,
        y: source.y
      };
      return diagonal({
        source: o,
        target: o
      });
    })
    .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
    d.y0 = d.y;
  });
}

function draw_tree(root) {
    root.x0 = 0;
    root.y0 = height / 2;

    root.children.forEach(collapse);

    update(root, root);
    d3.select(self.frameElement).style("height", "800px");
}

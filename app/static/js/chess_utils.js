function collapse(d) {
  if (d._all_children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function nodeSort(a, b){
    return a.sort_index > b.sort_index;
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

function transition_start() {
  if (flag_child_update) {
      flag_mouse = true;
  }
}

function transition_over() {
  flag_mouse = false;
  flag_child_update = false;
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
          return interpolateColor(white_colour_nodes, black_colour_nodes, .5 - (d.abs_score / 100));
      });
}

function group_filter(node, max_group) {
    return node.score_group <= max_group;
}

// Toggle children on click.
function click(d, root) {
  if (isNaN(d.max_group)) {
      d.max_group = 0;
  } else if (d.max_group == 2) {
      d.max_group = -1;
  } else {
      d.max_group += 1;
  }
  
  if (d._all_children) {
        d.children = d._all_children.filter(function (t) {return t.score_group <= d.max_group;});
        update(d, root);
    } else {
      flag_child_update = true;
      d3.json('/board/' + d.fen, function(data) {
                    d._all_children = data
                    d.children = d._all_children.filter(function (t) {return t.score_group <= d.max_group;});
                    update(d, root);
                });
  }
}

function mouseover(d, root, node) {
  // Use D3 to select element, change color and size
  if (!flag_mouse) {
    d3.select(node).attr({
      fill: "#DB838C"
    });
    tooltip
   .html(
     "<div class='w3-container'  align='center'><h2>Node info</h2><ul class='w3-ul w3-large'><li> Node name: " +
       d.name +
       "</li><li>Is main line: " +
       d.primary +
       "</li><li>Score: " +
       d.score.toFixed(0) +
       "</li><li>Value: " +
       d.value.toFixed(2) +
       "</li>Number of children: " +
       d.num_moves +
       "<li></li></ul></div>"
   )
      .style("visibility", "visible");
    var board1 = Chessboard(
                        'board',
                        position = d.fen,
                        //draggable = true,
                        //sparePieces = true,
                        //onDragMove = onDragMove,
                        );
    while (d.parent) {
      d.color = stroke_select_colour;
      d = d.parent;
    }

    d3.selectAll("path")
        .style("stroke", function(d) { return d.target.color;});
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
      d.target.color = interpolateColor(high_val_colour_lines, low_val_colour_lines, d.target.value);
      return d.target.color;
    });
    update(d, root);
  }
}

function nodeTopText(d) {
    if (d._children && Object.keys(d._children).length > 0) {
        return d.name;// + ' (' + Object.keys(d._children).length + ')';
    } else {
        return  d.name;
    }
}

function nodeCenterText(d) {
    var next_count;

    if (d.max_group == 2) {
        console.log('in' + d.max_group);
        next_count = " (-" + d.num_moves + ')';
    } else {
        console.log('update' + d.max_group);
        next_count =  " (+" +  Math.ceil(d.num_moves/3) + ')';
    }
    return d.num_moves + next_count;
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
    .attr("y", rectH * -.5)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .style("fill", text_top_colour)
    .style("fill-opacity", 1)
    .text(nodeTopText);

    nodeEnter
      .append("text")
      .attr("x", function(d) {return nodeWidth(d) / 2;} )
      .attr("y", rectH * .5)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("fill", text_middle_colour)
      .style("fill-opacity", 1)
      .text(nodeCenterText);

  // Transition nodes to their new position.
  var nodeUpdate = node
    .transition()
    .each("start", transition_start)
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
    .style("stroke-width", function(d) { return  d.target.value  * d.target.value  *(d.target.value * 10) * d.target.value  +1 ;})
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
    root.x0 = 1000;
    root.y0 = height / 2;

    //root.children.forEach(collapse);
    click(root, root);
    update(root, root);
    d3.select(self.frameElement).style("height", "1000");
}

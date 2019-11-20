

//The next block of code declares the function that will be used to draw the links between the nodes.
var diagonal = d3.svg.diagonal().projection(function(d) {
  return [d.x + rectW / 2, d.y + rectH / 2];
});

function shrink(d) {
    if (d.children) {
      d._children = d.children;
      d.shrunk_children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
}

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

function dist2(a, b) {
  return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
}


function makeParentGray(node) {
  if (node === root) {
    return;
  } else {
    // makeLinkGray()
    return makeParentGray(parent);
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
    console.log(d.level)
    if (isNaN(d.level) || d.level <= 1) {
        return rectW;
    } else if (d.level <= 5) {
        return rectW / 2;
    } else {
        return rectW / 4;
    }
}

function draw_node(node){
    node.append("rect")
      .attr("width", nodeWidth)
      .attr("height", rectH)
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .style("fill", function(d) {
          if (d.primary) {
              return "#08306b";
          } else {
              return d._children ? "lightsteelblue" : "#fff";
          }

      });
}

// Toggle children on click.
function click(d, root) {
  flag_mouse = true;
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  update(d, root);
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
       "</li><li>Level: " +
       d.level +
       "</li>Number of children: " +
       (d._children ? Object.keys(d._children).length : 0) +
       "<li></li></ul></div>"
   )
      .style("visibility", "visible");
    var board1 = Chessboard('board', d.fen);
    while (d.parent) {
      d.color = "darkred";
      d = d.parent;
    }

    d3.selectAll("path").style("stroke", function(d) {
      if (d.target.color) {
        return d.target.color; //if the value is set
      } else {
        return "gray";
      }
    });
    update(d, root);
  }
}

function mouseout(d, root, node) {
  if (!flag_mouse) {
    d3.select(node).attr({
      fill: "black"
    });
    tooltip.style("visibility", "hidden");
    svg.selectAll("path.link").style("stroke", function(d) {
      d.target.color = "gray";
      return "gray";
    });
    update(d, root);
  }
}

function nodeText(d) {
    if (d._children && Object.keys(d._children).length > 0) {
        return d.name + ' (' + Object.keys(d._children).length + ')';
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
    .attr("stroke", "black")
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
    .attr("x", rectW / 2)
    .attr("y", rectH / 2)
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

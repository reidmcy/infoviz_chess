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
      .attr("stroke", function(d) { return d.is_white? node_stroke_colour_white : node_stroke_colour_black;})
      .attr("stroke-width", 3)
      .style("fill", function(d) {
          return interpolateColor(white_colour_nodes, black_colour_nodes, .5 - (d.abs_score / 100));
      });
}

function group_filter(node, max_group) {
    return node.score_group <= max_group;
}

function updateNodeChildren (d, root) {
  flag_mouse = true;
  flag_child_update = true;
    if (d._all_children) {
          d.children = d._all_children.filter(function (t) {
              return t.score_group <= d.max_group;
          });
          update(d, root);
      } else {
        // flag_child_update = true;
        d3.json('/board/' + d.fen, function(data) {
                      d._all_children = data
                      d.children = d._all_children.filter(function (t) {
                          return t.score_group <= d.max_group;
                      });
                      update(d, root);
                  });
    }
}

function expandNode(d, root) {
  flag_mouse = true;
    if (isNaN(d.max_group)) {
        d.max_group = 0;
    } else {
        d.max_group = Math.min(2, d.max_group + 1);
    }
    updateNodeChildren(d, root);
}

function contractNode(d, root) {
    if (isNaN(d.max_group)) {
        d.max_group = -1;
    } else {
        d.max_group = Math.max(-1, d.max_group - 1);
    }
    updateNodeChildren(d, root);
}

// Toggle children on click.
function click(d, root) {
  flag_mouse = true;
  d.clicked = true;
  if (d.max_group == 2) {
      d.max_group = -1;
      updateNodeChildren (d, root);
      d.clicked = false;
  } else {
      expandNode(d, root);
      d.clicked = false;
  }
}

function tooltip_draw(d) {
  d3.select("#myBar").style("width", parseInt(d.value*100) + "%")
  d3.select("#myBar").html(parseInt(d.value*100) + "%")

    tooltip.html(
    //  "<div id='mynodeinfo' class='w3-container' ><h3>Node info</h3><ul class='w3-ul w3-medium'><li> Node name: " +
    //    d.name +
    //    "</li><li>Centipawn value: " +
    //    d.abs_score.toFixed(0) +
    //    //"</li><li>Value: " +
    //    //d.value.toFixed(2) +
    //    "</li><li>Win prob: " +
    //    d.win_prob.toFixed(2) +
    //    "</li><li>Is Blunder: " +
    //    d.blunder +
    //    "</li><li>Is popular: " +
    //    d.popular +
    //    "</li><li>Is Tricky: " +
    //    d.trick_line +
    //    "</li><li>Is Tricky for Opponent: " +
    //    d.trick_opp_line +
    //    "</li>Number of children: " +
    //    d.num_moves +
    //    "<li></li></ul></div>"
    "<table class='table table-striped table-bordered'> <thead><tr><th scope='col' >Attribute</th><th scope='col'>Value</th></tr></thead><tbody><tr> <th scope='row'>Node name</th><td>"
    + d.name +
    "</td></tr><tr><th scope='row'>Centipawn value</th><td>"
    + d.abs_score.toFixed(0)+
    "</td></tr><tr><th scope='row'>Win prob</th><td>"
    + d.win_prob.toFixed(2) +
    "</td></tr><tr><th scope='row'>Is Blunder</th><td>"
    + d.blunder +
    "</td></tr><tr><th scope='row'>Is popular</th><td>"
    + d.popular +
    "</td></tr><tr><th scope='row'>Is Tricky</th><td>"
    + d.trick_line +
    "</td></tr><tr><th scope='row'>Is Tricky for Opponent</th><td>"
    + d.trick_opp_line +
    "</td></tr><tr><th scope='row'>Number of children</th><td>"
    + d.num_moves +
    "</td></tr></tbody></table>"
   )
   
   .style("position", "relative").style("visibility", "visible").style("display", "block").style("text-align", "center").style("margin","auto");
    var board1 = Chessboard( 'board', position = d.fen);
}

function mouseover(d, root, node) {
  // Use D3 to select element, change color and size
  if (!flag_mouse) {
    current_node = d;
    d3.select(node).attr({
      fill: "#DB838C"
    });
    tooltip_draw(d)
    while (d.parent) {
      d.color = stroke_select_colour;
      d = d.parent;
    }
    update(d, root);
  }
  d3.selectAll("path").style("stroke", function(d) { return d.target.color;});
  // d3.select("#myBar").style("width", d.score + "%")
  // d3.select("#myBar").html(d.score + "%")
}

function mouseout(d, root, node) {
  if (!flag_mouse) {
    d3.select(node).attr({
      fill: node_unselect_colour
    });
    // tooltip_draw(d)
    //tooltip.style("visibility", "hidden");
    update(d, root);
  }
  svg.selectAll("path.link").style("stroke", function(d) { d.target.color = interpolateColor(high_val_colour_lines, low_val_colour_lines, d.target.value); return d.target.color; });
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
        next_count = " (-" + d.num_moves + ')';
    } else {
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
    nodeUpdate.select('rect')
    .style("fill", function(d) {
        if (d.clicked) {
            return 'black';
        }
        else {
            return interpolateColor(white_colour_nodes, black_colour_nodes, .5 - (d.abs_score / 100));
        }
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
    .style("stroke", function(d) {
      d.target.color = interpolateColor(high_val_colour_lines, low_val_colour_lines, d.target.value);
      return d.target.color;
    })
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

    click(root, root);
    tooltip_draw(root);
    update(root, root);
    d3.select(self.frameElement).style("height", "1000");
    current_node = root;
    root_node = root;
}

$('#expandBtn').on('click', function () {return expandNode(current_node, root_node)})
$('#contractBtn').on('click', function () {return contractNode(current_node, root_node)})
$('#rootBtn').on('click', function () {
   location.href = "/root/" + current_node.fen;
});

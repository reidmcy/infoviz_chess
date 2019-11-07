var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
  },
  width = 960 - margin.right - margin.left,
  height = 800 - margin.top - margin.bottom;


var i = 0,
  duration = 750,
  rectW = 60,
  rectH = 30;

var flag_mouse = false;

var tree = d3.layout.tree().nodeSize([70, 40]); // Creates a new tree layout with the default settings
//The next block of code declares the function that will be used to draw the links between the nodes.
//This isn’t the part of the code where the links are drawn, this is just declaring the variable/function
// that will be used when it does happen.
var diagonal = d3.svg.diagonal().projection(function(d) {
  return [d.x + rectW / 2, d.y + rectH / 2];
});

//The next block of code appends our SVG working area to the body of our web page and creates
// a group elements (<g>) that will contain our svg objects (our nodes, text and links).
var svg = d3
  .select("#tree_part")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "1000")
  .style("background-color", "#E5E5E5")
  .call(
    (zm = d3.behavior
      .zoom()
      .scaleExtent([0.2, 8]) // amount of zoom
      .on("zoom", redraw))
  )
  .append("g")
  .attr("transform", "translate(" + 350 + "," + 20 + ")");

//necessary so that zoom knows where to zoom and unzoom from
zm.translate([350, 20]);

function collapse(d) {
  if (d.children) {
    d._children = d.children;
    d._children.forEach(collapse);
    d.children = null;
  }
}

// create a tooltip
var tooltip = d3
  .select("#info_part")
  .append("div")
  .style("position", "absolute")
  .style("visibility", "hidden");
//   .text("I'm a circle!");


var treedat = {
    "name": "Top Level",
    "parent": "null",
    "children": [
      {
        "name": "Level 2: A",
        "parent": "Top Level",
        "children": [
          {
            "name": "Son of A",
            "parent": "Level 2: A"
          },
          {
            "name": "Daughter of A",
            "parent": "Level 2: A"
		  }
        ]
      },
      {
        "name": "Level 2: B",
        "parent": "Top Level",
	  "children":[
		  {
			"name": "test 1",
            "parent": "Level 2: B"
		  },
		  {
			"name": "test 2",
			"parent": "Level 2: B",
			"children":[
				{
					"name": "test 21",
					"parent": "test 2",
				},
				{
					"name": "test 22",
					"parent": "test 2"
				}
				,{
					"name": "test 23",
					"parent": "test 2"
				}
			]
		  }
	  	]
		},
    ]
  };






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

function draw_tree(root) {
    root.x0 = 0;
    root.y0 = height / 2;

    root.children.forEach(collapse);

    function update(source) {
      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(), // Runs the tree layout, returning the array of nodes associated with the specified root node
        links = tree.links(nodes);
      // Normalize for fixed-depth.
      nodes.forEach(function(d) {
        d.y = d.depth * 100;
      });

      // Update the nodes…
      var node = svg.selectAll("g.node").data(nodes, function(d) {
        // We then declare the variable / function node so that when we call it
        // later it will know to select the appropriate object (a node) with the appropriate .id
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
        .on("click", click)
        .on("mouseover", function(d) {
          // Use D3 to select element, change color and size
          if (!flag_mouse) {
            d3.select(this).attr({
              fill: "orange"
            });
            tooltip
              .html(
                "node ID: " +
                  d.id +
                  "<br>" +
                  "node name: " +
                  d.name +
                  "<br>" +
                  "..."
              )
              .style("visibility", "visible");

            //reset all the data to have color undefined.
            // flatten(root).forEach(function(d) {
            //   d.color = undefined;
            // });
            //iterate over the selected node and set color as red.
            //till it reaches the root
            while (d.parent) {
              d.color = "red";
              d = d.parent;
            }

            d3.selectAll("path").style("stroke", function(d) {
              if (d.target.color) {
                return d.target.color; //if the value is set
              } else {
                return "gray";
              }
            });

            update(d);
          }
        })
        .on("mouseout", function(d) {
          if (!flag_mouse) {
            d3.select(this).attr({
              fill: "black"
            });
            tooltip.style("visibility", "hidden");
            svg.selectAll("path.link").style("stroke", function(d) {
              d.target.color = "gray";
              return "gray";
            });
            update(d);
          }
        });

      nodeEnter
        .append("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeEnter
        .append("text")
        .attr("x", rectW / 2)
        .attr("y", rectH / 2)
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) {
          return d.name;
        });

      // Transition nodes to their new position.
      var nodeUpdate = node
        .transition()
        .each("end", transition_over)
        .duration(duration)
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        });

      nodeUpdate
        .select("rect")
        .attr("width", rectW)
        .attr("height", rectH)
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .style("fill", function(d) {
          return d._children ? "lightsteelblue" : "#fff";
        });

      nodeUpdate.select("text").style("fill-opacity", 1);

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
        .attr("width", rectW)
        .attr("height", rectH)
        //.attr("width", bbox.getBBox().width)""
        //.attr("height", bbox.getBBox().height)
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

    // Toggle children on click.
    function click(d) {
      flag_mouse = true;
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }


    update(root);
    d3.select(self.frameElement).style("height", "800px");
}




d3.json("/static/js/tree.json", function(data) {
    draw_tree(data[0]);
});
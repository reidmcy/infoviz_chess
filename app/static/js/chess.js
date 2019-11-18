//All the functions are in chess_utils

// Size of window
var margin = {
    top: 20,
    right: 120,
    bottom: 20,
    left: 120
  },
width = 960 - margin.right - margin.left,
height = 800 - margin.top - margin.bottom;


// Tree tree viz stuff
var i = 0;
duration = 750;
rectW = 60;
rectH = 30;
node_seperationW = rectW + 10;
node_seperationH = rectH + 10;
background_colour = "#gray"

//D3 stuff
var flag_mouse = false;
var tree = d3.layout.tree().nodeSize([node_seperationW, node_seperationH]);

//The next block of code appends our SVG working area to the body of our web page and creates a group elements (<g>) that will contain our svg objects (our nodes, text and links).
var svg = d3
  .select("#tree_part")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "1000")
  .style("background-color", background_colour)
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

// create a tooltip
var tooltip = d3
  .select("#info_part")
  .append("div")
  .style("position", "absolute")
  .style("visibility", "hidden");

d3.json("/static/js/board_dat.json", function(data) {
    draw_tree(data[0]);
});

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
minWidth = 20;
rectW = 40;
rectH = 30;
node_seperationW = minWidth + rectW;
node_seperationH = rectH + 10;
dist_between_nodes = 100;

stroke_select_colour = "darkred";
stroke_not_select_colour = "gray";

node_line_colour = 'black'
node_unselect_colour = 'black'

background_colour = "#gray";
primary_colour = "rbg(0, 0, 200)";

high_val_colour = [10,10,230];
low_val_colour = [10,255,0];

//D3 stuff
var flag_mouse = false;

var tree = d3.layout.tree()
        .nodeSize([node_seperationW, node_seperationH])
        .separation(separation);

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

//The next block of code declares the function that will be used to draw the links between the nodes.
var diagonal = d3.svg.diagonal().projection(function(d) {
  return [d.x + nodeWidth(d) / 2, d.y + rectH / 2];
});

// create a tooltip
var tooltip = d3
  .select("#info_part")
  .append("div")
  .style("position", "absolute")
  .style("visibility", "hidden");

d3.json("/static/js/board_dat.json", function(data) {
    draw_tree(data[0]);
});

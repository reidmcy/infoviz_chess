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

text_top_colour = "blue"
text_middle_colour = "red"

stroke_select_colour = "#DB838C";
stroke_not_select_colour = "gray";

node_stroke_colour_black = 'black'
node_stroke_colour_white = 'white'
node_unselect_colour = 'black'

background_colour = "#8AC6D0";
primary_colour = "rbg(0, 0, 200)";

progress_bar_white_active = 'white'
progress_bar_black_active = 'black'

high_val_colour_lines = [245, 222, 178]//[255, 238, 255]; // TODO
low_val_colour_lines = [128, 0, 128]; // TODO
blunder_dash_style = "(5,5)"
nonblunder_dash_style = "(1)"

black_colour_nodes = [200, 200, 200]; // TODO
white_colour_nodes = [100, 100, 100]; // TODO

//D3 stuff
var flag_mouse = false;
var flag_child_update = false;
var current_node;
var root_node;

var tree = d3.layout.tree()
        .nodeSize([node_seperationW, node_seperationH])
        .separation(separation)
        .sort(nodeSort);

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
  .attr("transform", "translate(" + 600  + "," + 100 + ")");

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

d3.json('/start/' + start_fen, function(data) {
    draw_tree(data);
});

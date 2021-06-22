const queryParams = getQueryParams();
const highlight = queryParams["highlight"] && queryParams["highlight"].split(",");


dims = ["pdi", "idv", "mas", "uai", "ltowvs", "ivr"]
const initialXdim = queryParams["x"] || "pdi";
const initialYdim = queryParams["y"] || "idv";

var transitionTime = 2000;


// Prep the SVG (not a) canvas

var margin = {top: 50, right: 100, bottom: 30, left: 40};
var height = 400;
var width = 600;

// fill the screen, make it responsive
var svg = d3.select("div#chart")
.append("div")
.classed("svg-container", true) 
.append("svg")
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 600 400")
.classed("svg-content-responsive", true);


svg.append("rect")
.classed("rect", true)
.attr("width", width)
.attr("height", height);

var legendXScale = d3.scaleLinear()
    .domain([0,dims.length])
    .range([margin.left, width - margin.right]);
var legendYScale = d3.scaleLinear()
    .domain([dims.length, 0])
    .range([height - margin.bottom, margin.top]);

var xDims = svg.append("g").attr("class","x-dimensions")
      .selectAll("text")
      .data(dims)
      .enter().append("text")
      .attr("class", function(d) {return d;})
      .attr("y", 20)
      .attr("x", function(d, i) {return legendXScale(i+.5);})
      .text(function(d, i) {return d;});

var yDims = svg.append("g").attr("class","y-dimensions")
      .selectAll("text")
      .data(dims)
      .enter().append("text")
      .attr("class", function(d) {return d;})
      .attr("x", width-60)
      .attr("y", function(d, i) {return legendYScale(i+.5);})
      .text(function(d, i) {return d;});


var x = d3.scaleLinear()
    .domain([0, 110])
    .range([margin.left, width - margin.right]);

var y = d3.scaleLinear()
    .domain([0, 110])
    .range([height - margin.bottom, margin.top]);
    
var xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

var yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

svg.append("g")
    .call(xAxis);

svg.append("g")
    .call(yAxis);

    // get the data
d3.text("data/6-dims-countries.csv").then(function(blob) {
  var data = d3.dsvFormat(";").parse(blob);
  
  var points = svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      // .attr("cx", function (d) { return x(d[xDim]); } )
      // .attr("cy", function (d) { return y(d[yDim]); } )
      .attr("r", function(d) { return (highlight && highlight.includes(d.ctr)) ? 5 : 2; })
      .style("fill", function(d) { return (highlight && highlight.includes(d.ctr)) ? "red" : "black" });
//      .style("fill", "black");



var flags = svg.append('g')
.selectAll("flag")
.data(data)
.enter()
.filter(d=>(highlight && highlight.includes(d.ctr)))
.append("image")
  .attr("width", 30)
    .attr("height", 20)
    // .attr("x", function (d) { return x(d[xDim]) - 15; })
    // .attr("y", function (d) { return y(d[yDim]) - 10; })
    .attr("xlink:href", function(d) {return "http://fonttools.github.io/region-flags/svg/" + alpha3to2(d.ctr) + ".svg"})
    .attr("preserveAspectRatio", "xMinYMin");

  function plot(xDim, yDim, transition) {
    console.log(xDim,yDim)

    // update the axis links with the new dimensions  
    d3.selectAll(".current").classed("current",false);
    d3.selectAll(".x-dimensions ." + xDim)
      .classed("current",true);
    d3.selectAll(".y-dimensions ." + yDim)
      .classed("current",true);

    xDims.on("click", function(e, d) {plot(d,yDim,transitionTime);});   
    yDims.on("click", function(e, d) {plot(xDim,d,transitionTime);});   

    // convert all nill values to 0
    data.forEach(function(d) {
      d[xDim] = +d[xDim] ?? 0;
      d[yDim] = +d[yDim] ?? 0;
    });


    points.transition().duration(transition)
        .attr("cx", function(d) { return x(d[xDim]); })
        .attr("cy", function(d) { return y(d[yDim]); })
//        .style("fill", function(d) { return (highlight && highlight.includes(d.ctr)) ? "red" : "black" });

    flags.transition().duration(transition)
    .attr("x", function (d) { return x(d[xDim]) - 15; })
    .attr("y", function (d) { return y(d[yDim]) - 10; });

  }
  plot(initialXdim, initialYdim, 0);})


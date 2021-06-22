// Prep the SVG (not a) canvas

var margin = {top: 20, right: 30, bottom: 30, left: 40};
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

var x = d3.scaleLinear()
    .domain([0, 100])
    .range([margin.left, width - margin.right]);

var y = d3.scaleLinear()
    .domain([0, 100])
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
d3.text("data/6-dimensions-for-website-2015-08-16.csv").then(function(blob) {
  var data = d3.dsvFormat(";").parse(blob);
  // Update
  // var flags = d3.select("#chart")
  // .selectAll("p")
  // .data()
  // .enter().append("p").text(d=>JSON.stringify(d));
  
  var flags = svg.append('g')
    .selectAll("dot")
    .data(data);

  flags
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.pdi); } )
      .attr("cy", function (d) { return y(d.idv); } )
      .attr("r", 1.5)
      .style("fill", "black");

  // flags.enter()
  //   .append("text")
  //   .filter(d=>!isNaN(d.idv) )
  //   .attr("x", function (d) { return x(d.pdi); } )
  //   .attr("y", function (d) { return y(d.idv); } )
  //   .text(function (d) {return alpha3to2(d.ctr)});


  flags.enter().append("image")
  .filter(d=>!isNaN(d.idv) )
  .attr("width", 15)
    .attr("height", 10)
    .attr("x", function (d) { return x(d.pdi) - 7; })
    .attr("y", function (d) { return y(d.idv) - 5; })
    .attr("xlink:href", function(d) {return "http://fonttools.github.io/region-flags/svg/" + alpha3to2(d.ctr) + ".svg"})
    .attr("preserveAspectRatio", "xMinYMin");
  // Enter
  
  
  // Exit
  
  //
})


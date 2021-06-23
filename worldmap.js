const queryParams = getQueryParams();
dims = ["pdi", "idv", "mas", "uai", "ltowvs", "ivr"]
dimensionNames = {
  pdi:"Power Distance Index",
  idv:"Indvidualism vs Collectivism",
  mas:"Masculinity vs Femininity",
  uai:"Uncertainty Avoidance",
  ltowvs:"Long Term vs Short Term Orientation",
  ivr:"Indulgence vs Restraint"
}
const dim = queryParams["dimension"] || "pdi";
d3.select("#dimensionName").text(dimensionNames[dim])

// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoNaturalEarth()
    .scale(width / 2 / Math.PI)
    .translate([width / 2, height / 2])
var path = d3.geoPath()
    .projection(projection);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleLinear()
    .domain([0,50,100])
    .range(["red", "grey", "green"]);

// Load external data and boot
d3.queue()
    .defer(d3.json, "https://enjalot.github.io/wwsd/data/world/world-110m.geojson")
    .defer(d3.csv, "data/6-dims-commas.csv", function(d) { data.set(d.ctr, +d[dim]); })
    .await(ready);

function ready(error, topo) {
    if (error) throw error;

    // Draw the map
    svg.append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topo.features)
        .enter().append("path")
            .attr("fill", function (d){
                // Pull data for this country
                d.total = data.get(d.id) || 0;
                if(d.total==0) { return "black"}
                // Set the color
                return colorScale(d.total);
            })
            .attr("d", path);
}

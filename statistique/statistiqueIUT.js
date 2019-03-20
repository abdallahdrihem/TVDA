 
var margin = {top: 20, right: 30, bottom: 30, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom,
padding = 0.3;

var x = d3.scale.ordinal()
.rangeRoundBands([0, width], padding);

var y = d3.scale.linear()
.range([height, 0]);

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom");

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.tickFormat(function(d) { return ageFormatter(d); });

var chart2 = d3.select(".chart2")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("./statistique/statistique.csv", type, function(error, data) {

// Transform data (i.e., finding cumulative values and total) for easier charting
var cumulative = 0;
for (var i = 0; i < data.length; i++) {
data[i].start = cumulative;
cumulative += data[i].inscritsIUT;
data[i].end = cumulative;

data[i].class = ( data[i].inscritsIUT >= 0 ) ? 'positive' : 'negative'
}
data.push({
name: 'Total',
end: cumulative,
start: 0,
class: 'total'
});

x.domain(data.map(function(d) { return d.name; }));
y.domain([0, d3.max(data, function(d) { return d.end; })]);

chart2.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

/* chart2.append("g")
  .attr("class", "y axis")
  .call(yAxis);
*/
var bar = chart2.selectAll(".bar")
  .data(data)
.enter().append("g")
  .attr("class", function(d) { return "bar " + d.class })
  .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

bar.append("rect")
  .attr("y", function(d) { return y( Math.max(d.start, d.end) ); })
  .attr("height", function(d) { return Math.abs( y(d.start) - y(d.end) ); })
  .attr("width", x.rangeBand());

bar.append("text")
  .attr("x", x.rangeBand() / 2)
  .attr("y", function(d) { return y(d.end) + 5; })
  .attr("dy", function(d) { return ((d.class=='negative') ? '-' : '') + ".75em" })
  .text(function(d) { return ageFormatter(d.end - d.start);});

bar.filter(function(d) { return d.class != "total" }).append("line")
  .attr("class", "connector")
  .attr("x1", x.rangeBand() + 5 )
  .attr("y1", function(d) { return y(d.end) } )
  .attr("x2", x.rangeBand() / ( 1 - padding) - 5 )
  .attr("y2", function(d) { return y(d.end) } )
});

function type(d) {
d.inscritsIUT = +d.inscritsIUT;
return d;
}

function ageFormatter(n) {
n = Math.round(n);
var result = n;
if (Math.abs(n) > 1000) {
result = Math.round(n/1000) + 'K';
}
return  result + ' Inscrits ' ;
}



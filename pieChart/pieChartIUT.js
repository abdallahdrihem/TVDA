
        var svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = Math.min(width, height) / 2;
    
    var g = svg.append("g")
               .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#1abc9c','#2ecc71','#3498db','#9b59b6','#e41a1c','#34495e','#e74c3c','#e67e22','#f1c40f']);
/////////////////////////////////////////////////////  
var rect = d3.select("svg")
.append("rect")
.attr("width", 20)
.attr("height", 20)
.style("fill", "#1abc9c");

var rect1 = d3.select("svg")
.append("rect")
.attr("y",20)
.attr("width", 20)
.attr("height", 20)
.style("fill", "#2ecc71");

var rect3 = d3.select("svg")
.append("rect")
.attr("y",40)
.attr("width", 20)
.attr("height", 20)
.style("fill", "#3498db");

var rect3 = d3.select("svg")
.append("rect")
.attr("y",60)
.attr("width", 20)
.attr("height", 20)
.style("fill", "#9b59b6");

var rect4 = d3.select("svg")
.append("rect")
.attr("y",80)
.attr("width", 20)
.attr("height", 20)
.style("fill", "#e41a1c");

var rect5 = d3.select("svg")
.append("rect")
.attr("y",100)
.attr("width", 20)
.attr("height", 20)
.style("fill", "#34495e");

var rect5 = d3.select("svg")
.append("rect")
.attr("y",120)
.attr("width", 20)
.attr("height", 20)
.style("fill", "#e74c3c");

var rect5 = d3.select("svg")
.append("rect")
.attr("y",140)
.attr("width", 20)
.attr("height", 20)
.style("fill", "#e67e22");

svg.append('text').text('2011')
            .attr('x', 20)
            .attr('y', 13)
            .attr('fill', 'black')
            .attr("class", "text");
            
svg.append('text').text('2012')
            .attr('x', 20)
            .attr('y', 33)
            .attr('fill', 'black')
            .attr("class", "text");
            
svg.append('text').text('2013')
            .attr('x', 20)
            .attr('y', 55)
            .attr('fill', 'black')
            .attr("class", "text");

svg.append('text').text('2014')
            .attr('x', 20)
            .attr('y', 75)
            .attr('fill', 'black')
            .attr("class", "text");

svg.append('text').text('2015')
            .attr('x', 20)
            .attr('y', 95)
            .attr('fill', 'black')
            .attr("class", "text");

svg.append('text').text('2016')
            .attr('x', 20)
            .attr('y', 115)
            .attr('fill', 'black')
            .attr("class", "text");
            
svg.append('text').text('2017')
            .attr('x', 20)
            .attr('y', 135)
            .attr('fill', 'black')
            .attr("class", "text");
            
svg.append('text').text('2018')
            .attr('x', 20)
            .attr('y', 155)
            .attr('fill', 'black')
            .attr("class", "text");
/////////////////////////////////////////////////////
    var pie = d3.pie().value(function(d) { 
            return d.percent; 
        });

    var path = d3.arc()
                 .outerRadius(radius - 10)
                 .innerRadius(0);

    var label = d3.arc()
                  .outerRadius(radius)
                  .innerRadius(radius - 80);

    d3.csv("./pieChartIUT.csv", function(error, data) {
        if (error) {
            throw error;
        }
        var arc = g.selectAll(".arc")
                   .data(pie(data))
                   .enter().append("g")
                   .attr("class", "arc");

        arc.append("path")
           .attr("d", path)
           .attr("fill", function(d) { return color(d.data.browser); });
    
        console.log(arc)
    
        arc.append("text")
           .attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
            })
           .text(function(d) { return d.data.percent + '%' ; });
        });

      /*  svg.append("g")
           .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
           .append("text")
           .text("Browser use statistics - Jan 2017")
           .attr("class", "title")*/

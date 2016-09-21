$(function() {

var window_width = $(window).width();
var fullWidth;
var fullHeight;

// responsive
if (window_width >= 650){
  fullWidth = 600;
  fullHeight = 500;
} else if (window_width <= 350) {
  fullWidth = 290;
  fullHeight = 290;
} else {
  fullWidth = window_width - 50;
  fullHeight = fullWidth - 50;
}

var margin = {top: 30, right: 20, bottom: 40, left: 40},
    width = fullWidth - margin.left - margin.right,
    height = fullHeight - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0,width]);

var y = d3.scaleLinear()
    .range([height,0]);

var svg = d3.select('#scatterplot').append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// tooltip
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset(function(){
      if (d3.mouse(this)[0] < 100){
        return [-10,100];
      } else if (d3.mouse(this)[0] < fullWidth -50 && d3.mouse(this)[0] > fullWidth - 150 ){
        return [-10, -100];
      } else if (d3.mouse(this)[1] < 50){
        return [80, 0];
      } else {
        return [-10, 0];
      }
  })
  .html(function(d) {
    return "<em>" + d.name + "</em><br><strong>Average Helmet Rating: </strong>" + d.avg_star +
            "</br><strong>Concussions in 2015: </strong>" + d.concussions2015 ;
  });
svg.call(tip);


d3.csv('js/concussionsbyschool.csv', function(d){
  d.avg_star = +d.avg_star;
  d.concussions2015 = +d.concussions2015;
  d.name = d.name;
  d.school_id = d.school_id;
  return d;
}, function(error, data){
  if (error) throw error;

  x.domain(d3.extent(data, function(d) {return d.avg_star;})).nice();
  y.domain([0, d3.max(data, function(d) {return d.concussions2015 + 2;})]);

  // x and y axes
  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    .append("text")
      .attr("class", "axis-title")
      .attr('x', width)
      .attr("y", 25)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Average Helmet Rating");

  svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("class", "axis-title")
      .attr('x', -40)
      .attr("y", -20)
      .attr("dy", ".71em")
      .style("text-anchor", "start")
      .text("Concussions");

  drawCircle(0, data);

    $('#school').selectize({
      options: data,
      maxItems: 1,
      labelField: 'name',
      searchField: 'name',
      sortField: 'name',
      valueField: 'school_id',
      onChange: function(id) {
          drawCircle(id, data);
          console.log(id);
      },
      allowEmptyOption: true,
      placeholder: 'Enter a school name to search'
    });

  // d3.select('#school').on('change', function() {
  //   drawCircle(this.value, data);
  // });

});

d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function drawCircle(school_id, data){
  svg.selectAll('.dot').remove();
  svg.selectAll('.dot')
      .data(data)
    .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 3.5)
      .attr('cx', function(d) {return x(d.avg_star);})
      .attr('cy', function(d) {return y(d.concussions2015);})
      .style('fill', function(d){
        if (d.school_id == school_id){
          var sel = d3.select(this);
          sel.moveToFront();
          return 'blue';
        } else{
          return 'yellow';
        }
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

}
});

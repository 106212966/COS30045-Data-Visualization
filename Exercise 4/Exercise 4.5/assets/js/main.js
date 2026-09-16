// Exercise 4.3 Step 2
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 650 500") 
    .style("border", "1px solid black");

// Exercise 4.4 Step 2
d3.csv("assets/data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count //=> converts to number
  };

}).then(data => {
  // Check the data loaded correctly
  console.log("Loaded Data:", data);

  // Exercise 4.4 Step 3: Finding information about the data set
  console.log("Total rows:", data.length);
  console.log("Max count:", d3.max(data, d => d.count));
  console.log("Min count:", d3.min(data, d => d.count));
  console.log("Extent (Min & Max):", d3.extent(data, d => d.count));

  // Sort the data from highest count to lowest count
  data.sort((a, b) => b.count - a.count);
  
  // Call the function for the next exercise
  drawBarChart(data);
});

// Exercise 4.5 Step 1
const drawBarChart = data => {

  // Exercise 4.6 Step 1 & 2
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 500]);
  
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  // Exercise 4.7 Step 2: Create the group first
  const barAndLabel = svg
    .selectAll("g")
    .data(data)
    .join("g")
      .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

  // Exercise 4.7 Step 3: Append the rect to the group
  barAndLabel
    .append("rect")
    .attr("width", d => xScale(d.count)) 
    .attr("height", yScale.bandwidth()) 
    .attr("fill", "blue")
    .attr("x", 100) // Exercise 4.7 Step 1
    .attr("y", 0);  // Exercise 4.7 Step 3

  // Exercise 4.7 Step 4: Append Brand Text
  barAndLabel
    .append("text")
    .text(d => d.brand)
    .attr("x", 90)
    .attr("y", 15)
    .attr("text-anchor", "end")
    .style("font-size", "13px")

  // Exercise 4.7 Step 5: Append Count Text
  barAndLabel
    .append("text")
    .text(d => d.count)
    .attr("x", d => 100 + xScale(d.count) + 4)
    .attr("y", 12)
    .style("font-size", "13px")
};
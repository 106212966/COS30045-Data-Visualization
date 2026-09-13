// Exercise 4.3 Step 2
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 1600") // Exercise 4.6 Step 0 change viewBox to 500 x 1600
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

// Exercise 4.2 Step 2
d3.select("h1")
  .style("color", "green");

// Exercise 4.2 Step 3
d3.select("div")
  .append("p")
  .text("Purchasing a low energy consumption TV will help with your energy bills!");

// Exercise 4.2 Step 4
d3.select("svg")
  .append("rect")
  .attr("x", 50)
  .attr("y", 50)
  .attr("width", 100)
  .attr("height", 30)
  .style("fill", "green");

// Exercise 4.3 Step 3
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");

// Exercise 4.5 Step 1
const drawBarChart = data => {

  // Exercise 4.5 Step 2 set height of each bar
  const barHeight = 20;

  // Exercise 4.5 Step 3 space between each bar
  const barSpacing = 5;

  // Exercise 4.6 Step 1
  const xScale = d3.scaleLinear()
    .domain([0, 1200])
    .range([0, 400]);
  
  // Exercise 4.6 Step 2
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  svg
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("class", d => {
    console.log(d);
    return `bar bar-${d.count}`;
  })

  // Exercise 4.5 Step 2
  .attr("width", d =>  xScale(d.count)) // Exercise 4.6 Step 1 change to use xScale to scale the width of the bars
  .attr("height", yScale.bandwidth()) // Exercise 4.6 Step 2 change to use yScale.bandwidth() to set the height of the bars
  .attr("fill", "blue")

  // Exercise 4.5 Step 3
  .attr("x", 0)
  .attr("y", (d, i) => yScale(d.brand)); // Exercise 4.6 Step 2 change to use yScale to set the y position of the bars

};
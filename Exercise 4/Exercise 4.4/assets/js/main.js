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

// Exercise 4.3 Step 2
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// Exercise 4.3 Step 3
svg
  .append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");
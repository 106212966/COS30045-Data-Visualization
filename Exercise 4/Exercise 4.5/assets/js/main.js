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

    // Exercise 4.5 Step 1
const drawBarChart = data => {

  const barHeight = 20; // Exercise 4.5 Step 2 set height of each bar
  const barSpacing = 5; // Exercise 4.5 Step 3 space between each bar

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.count}`;
    })

  // Exercise 4.5 Step 2
  .attr("width", d => d.count)
  .attr("height", barHeight)
  .attr("fill", "blue")

  // Exercise 4.5 Step 3
  .attr("x", 0)
  .attr("y", (d, i) => i * (barHeight + barSpacing))

};
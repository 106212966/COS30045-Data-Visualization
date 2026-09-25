// Exercise 4.3 Step 2
const svg = d3.select(".responsive-svg-container")
  .append("svg")
    .attr("viewBox", "0 0 500 500") 
    .style("border", "1px solid black");

// Exercise 4.4 Step 2
d3.csv("assets/data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count //=> converts to number
  };

}).then(data => {
  // Check the data loaded correctly
  // Exercise 4.6
  console.log("Loaded Data:", data);
  console.log(data);
  console.log(data.length);
  console.log(d3.max(data, d => d.count));
  console.log(d3.min(data, d => d.count));

  // Sort the data from highest count to lowest count
  data.sort((a, b) => b.count - a.count);
  
  // Call the function for the next exercise
  drawBarChart(data);
});

const drawBarChart = data => {
  // Exercise 4.6 Step 1 & 2
  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 350]); // Ensure the range can see

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);
 
  // Exercise 4.7 Step 2: Create a group container for our labels
  const barAndLabel = svg
    .selectAll("g") // This replaces the old svg.selectAll("rect")
    .data(data)
    .join("g")
        .attr("transform", d => `translate(0, ${yScale(d.brand)})`);

    // Exercise 4.7 Step 3: Add back the rectangles
    barAndLabel
    .append("rect")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("fill", "blue")
        .attr("x", 100) // Step 1 add x-axis 100
        .attr("y",0); // Step 3

    // Exercise 4.7 Step 4: Add the column category text
    barAndLabel
    .append("text")
        .text(d => d.brand)
        .attr("x", 90) 
        .attr("y", 15)
        .attr("text-anchor", "end")
        .style("font-size", "13px");

    // Exercise 4.7 Step 5: Add the value number
    barAndLabel
    .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", 12)
        .style("font-size", "13px");
};


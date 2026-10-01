// Exercise 5.2: Load in data
d3.csv("assets/data/ARE_Spot_Prices.csv", d => {
    return {
        year: +d.Year,               
        averagePrice: +d['AveragePrice (notTas-Snowy)']
    };
}).then(data => {
  // Check that your data is being read in correctly
  console.log(data);

  // Sort the energy consumption data (highest to lowest)
  data.sort((a, b) => a.year - b.year);
  
  // Add the data to the function that will draw your bar chart
  drawLineChart(data);
});

const drawLineChart = data => {
    // Same margin and inner chart setup as the bar chart
    const margin = { top: 40, right: 200, bottom: 50, left: 50 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add svg container
    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black"); // Boader can remove later

    // Create inner chart for grouping
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.averagePrice)])
        .range([innerHeight, 0]);

    // Set up axes
    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d")); // Format ticks as integers for years

    const leftAxis = d3.axisLeft(yScale);

    // Add bottom axis
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add left axis
    innerChart
        .append("g")
        .call(leftAxis);

    // Add y-axis label
    innerChart
        .append("text")
        .text("Average Price ($ per mWh)") // Updated to reflect the price data
        .attr("x", -30)
        .attr("y", -20)
        .style("text-anchor", "start");
    
    // --- 1. Add x-axis label ---
    innerChart
        .append("text")
        .text("Year")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + 40) // Pushed down into the margin
        .style("text-anchor", "middle");

    // --- 4. Turn it into an area chart ---
    // Note: Need to draw the area BEFORE the line so it sits in the background
    const areaGenerator = d3.area()
        .x(d => xScale(d.year))
        .y0(innerHeight) // The bottom base of the filled area
        .y1(d => yScale(d.averagePrice))
        .curve(d3.curveStep); 

    innerChart
        .append("path")
        .attr("d", areaGenerator(data))
        .attr("fill", "lightgreen")
        .attr("opacity", 0.3); // Makes the fill slightly transparent

    // --- 2. Change the curve style of the line ---
    const lineGenerator = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.averagePrice))
        .curve(d3.curveStep); // Adds a smooth curve interpolation between points
    
    innerChart
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2);

    // --- 3. Adding a label to the line ---
    const lastDataPoint = data[data.length - 1]; // Grabs the 2024 data object
    
    innerChart
        .append("text")
        .text("Average Price ($ per mWh)")
        .attr("x", xScale(lastDataPoint.year) + 7) // Positioned 10px to the right of the last point
        .attr("y", yScale(lastDataPoint.averagePrice))
        .style("fill", "green")
        .style("alignment-baseline", "middle");
};
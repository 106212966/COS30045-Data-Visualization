// Exercise 5.1: Load in data
d3.csv("assets/data/Data_exercise5.1-1.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech, 
    Energy_Consumption: +d.Energy_Consumption // The '+' converts the string to a number
  };
}).then(data => {
  // Check that your data is being read in correctly
  console.log(data);

  // Sort the energy consumption data (highest to lowest)
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
  
  // Add the data to the function that will draw your bar chart
  drawBarChart(data);
});

// Set up function and margins
const drawBarChart = data => {
    // Set up inner chart margins and dimensions
    const margin = { top: 40, right: 170, bottom: 25, left: 40 };
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Add svg container
    const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("border", "1px solid black"); // Boader can remove later

    // Create inner chart for grouping
    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales for x
    const xScale = d3.scaleBand()
        .domain(data.map(d => d.Screen_Tech))
        .range([0, innerWidth])
        .padding(0.1);

    // Create scales for y
    const yScale = d3.scaleLinear()
        .domain([0, 399]) // Set the domain to a fixed range for better comparison
        .range([innerHeight, 0]);

    // Calculate the x and y axis (Removed ticks, adjusted padding)
    const bottomAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(10);
    const leftAxis = d3.axisLeft(yScale).tickPadding(10);

    // Add axes
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis)
        .selectAll("text")
        .style("text-transform", "uppercase"); // Makes the x-axis labels uppercase

    innerChart
        .append("g")
        .call(leftAxis);

    // Add axis label
    innerChart
        .append("text")
        .text("Energy Consumption (kWh)")
        .attr("x", -30) // Adjusted x position for better alignment
        .attr("y", -20)
        .style("text-anchor", "start")

    // Add bars to the chart
    innerChart
        .selectAll(".bar")
        .data(data)
        .join("rect")
            .attr("class", "bar")
            .attr("width", xScale.bandwidth())
            .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
            .attr("x", d => xScale(d.Screen_Tech))
            .attr("y", d => yScale(d.Energy_Consumption))
            .attr("fill", "green");

    // Add value labels on top of the bars
    innerChart
        .selectAll(".label")
        .data(data)
        .join("text")
            .attr("class", "label")
            // Rounds the number so it looks cleaner
            .text(d => `${Math.round(d.Energy_Consumption)} kWh`) // Displays the kWh string
            // Centers the text in the middle of the bar
            .attr("x", d => xScale(d.Screen_Tech) + (xScale.bandwidth() / 2))
            // Pushes the text 5 pixels above the bar
            .attr("y", d => yScale(d.Energy_Consumption) - 5)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("fill", "#000000");
};

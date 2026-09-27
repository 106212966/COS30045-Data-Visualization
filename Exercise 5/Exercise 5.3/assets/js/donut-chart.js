// Exercise 5.3: Load in data
d3.csv("assets/data/Data_exercise5.3.csv", d => {
    return {
        Screensize_Category: d.Screensize_Category,               
        count: +d.Count // The + converts the string to a number
    };
}).then(data => {
  // Check that your data is being read in correctly
  console.log(data);

  // Donut Chart do not need to sort
  
  // Add the data to the function that will draw your bar chart
  drawDonutChart(data);
});

// Set up function and margins
const drawDonutChart = data => {

    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20; // Leave some padding

    // Create color scale 
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2); // Use D3's category color scheme

    // Calculate angle for each slice using d3.pie
    const pie = d3.pie()
        .value(d => d.count)
        .sort(null); // Disable sorting to maintain original order

    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6) // Inner radius = 60% for donut shape
        .outerRadius(radius * 1); // Outer radius = 100% for donut shape

    // Add svg container
    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`)

    // Draw arcs
    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
            .attr("d", arcGenerator)
            .attr("fill", d => color(d.data.Screensize_Category)) // Use category for color
            .attr("stroke", "white")
            .attr("stroke-width", 2);

    // Add labels
    innerChart
        .selectAll("text")
        .data(pie(data))
        .join("text")
            .text(d => d.data.Screensize_Category) // This tells it to display "small", "medium", "large"
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`) // This centers it in the slice
            .style("text-anchor", "middle") // Keeps the text perfectly aligned in the middle
            .style("font-family", "sans-serif")
            .style("font-size", "14px");
};
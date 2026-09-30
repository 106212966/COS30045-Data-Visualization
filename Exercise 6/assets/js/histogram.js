const drawHistogram = (data) => {
    // Implementation for drawing the histogram
    
    // Set the dimensions and margins of the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Responsive SVG
        
    // Create an inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        
    // Get the bins for data set using the bin generator
    const bins = binGenerator(data); // save the bins into an array

    console.log(bins); // Log the bins to the console for debugging

    // Calculate the min and max energy consumption values from the bins
    const minEng = bins[0].x0; // lower bound of the first bin
    const maxEng = bins[bins.length - 1].x1; // upper bound of the last bin

    // calculate the maximum length of the bins to set the yScale domain
    const binsMaxLength = d3.max(bins, d => d.length); // Get the maximum length of the bins

    console.log("minEng:", minEng, "maxEng:", maxEng, "binsMaxLength:", binsMaxLength); // Log the min and max energy consumption values

    // Set the domains and ranges for the x and y scales
    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice(); // for rounding the values

    // 4. Draw the histogram bars
    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => xScale(d.x1) - xScale(d.x0))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor) // Gives the appearance of gaps between bars
            .attr("stroke-width", 2);

    // 5. Calculate and add the X and Y axes (Adapted from Exercise 5.1)
    const bottomAxis = d3.axisBottom(xScale).tickPadding(10);
    const leftAxis = d3.axisLeft(yScale).tickPadding(10);

    // Add X-axis to the bottom of the inner chart
    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add Y-axis to the left of the inner chart
    innerChart
        .append("g")
        .call(leftAxis);

    // 6. Add axis labels
    // X-axis label (Right side)
    innerChart
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", innerWidth) // Pushes the coordinate to the far right of the chart
        .attr("y", innerHeight + 40) // Keeps it below the x-axis line
        .style("text-anchor", "end") // Aligns the end of the text to the right edge
        .style("font-size", "12px");

    // Y-axis label (Top-left, horizontal)
    innerChart
        .append("text")
        .text("Frequency")
        .attr("x", -30) // Negative value pushes it slightly left of the y-axis line
        .attr("y", -20) // Negative value pushes it above the top of the chart
        .style("text-anchor", "start") // Aligns the text to the left
        .style("font-size", "12px");
};
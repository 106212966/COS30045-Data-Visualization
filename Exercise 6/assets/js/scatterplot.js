const drawScatterplot = (data) => {

    // Set the dimensions and margins of the chart area
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`) // Responsive svg

    // create an inner chart group with margins
    // (Notice we are not using 'const' here, as instructed, assuming it's in shared-constants.js)
    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // 1. Calculate the max star rating and max energy rating from the raw data
    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    // 2. Set the domains and ranges for the x scale (Star Rating)
    xScaleS
        .domain([0, maxStar]) // From 0 up to the highest star rating
        .range([0, innerWidth]);

    // 3. Set the domains and ranges for the y scale (Energy Consumption)
    yScaleS
        .domain([0, maxEnergy]) // From 0 up to the highest energy consumption
        .range([innerHeight, 0])
        .nice(); // for rounding the values
        
    // 4. set up color scale
    colorScale
        .domain(data.map(d => d.screenTech)) // get unique screenTech values
        .range(d3.schemeCategory10); // use a predefined color scheme
        
    // 5. Draw the circles
    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
            .attr("cx", d => xScaleS(d.star))
            .attr("cy", d => yScaleS(d.energyConsumption))
            .attr("r", 6) 
            .attr("fill", d => colorScale(d.screenTech))
            .attr("opacity", 0.5)
            .attr("stroke", "none"); // Explicitly ensuring no stroke is added
    // 6. Calculate and add the X and Y axes
    const bottomAxis = d3.axisBottom(xScaleS).tickPadding(10);
    const leftAxis = d3.axisLeft(yScaleS).tickPadding(10);

    // Add X-axis to the bottom of the inner chart
    innerChartS
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    // Add Y-axis to the left of the inner chart
    innerChartS
        .append("g")
        .call(leftAxis);

    // 7. Add axis labels
    // X-axis label (Right side, matching your histogram placement)
    innerChartS
        .append("text")
        .text("Star Rating") // x-axis represents the star rating
        .attr("x", innerWidth) 
        .attr("y", innerHeight + 40) 
        .style("text-anchor", "end") 
        .style("font-size", "12px");

    // Y-axis label (Top-left, horizontal)
    innerChartS
        .append("text")
        .text("Energy Consumption (kWh/year)") 
        .attr("x", -30) // Nudges it slightly left of the y-axis line
        .attr("y", -20) // Pushes it above the top of the chart
        .style("text-anchor", "start") // Aligns the text to the left
        .style("font-size", "12px");
    // 8. Add a Legend
    
    // Step 1: Set up a group element to contain legend items in the top right corner
    const legend = innerChartS.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${innerWidth - 80}, 0)`); // Pushes it to the far right

    // Step 2: Iterate through colour categories from your colorScale
    const legendItems = legend.selectAll(".legend-item")
        .data(colorScale.domain()) // Gets the unique screen tech names
        .join("g")                 // Creates a group for each legend item
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 20})`); // Spaces them vertically by 20px

    // Step 3: Add coloured rectangle
    legendItems.append("rect")
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", d => colorScale(d)); // Colors it based on the screen tech

    // Step 4: Add label text
    legendItems.append("text")
        .text(d => d) // Writes the screen tech name
        .attr("x", 20) // Pushes the text slightly to the right of the color box
        .attr("y", 10) // Nudges the text down to align with the middle of the box
        .style("font-size", "12px")
        .style("alignment-baseline", "middle");
};
const populateFilters = (data) => {

    const updateHistogram = (filterId, data) => {
        const updatedData = filterId === "all"
            ? data
            : data.filter(tv => tv.screenTech === filterId);
        const updatedBins = binGenerator(updatedData);

        d3.selectAll("#histogram rect")
         .data(updatedBins)
         .transition()
          .duration(500)
          .ease(d3.easeCubicInOut)
          .attr("y", d => yScale(d.length))
          .attr("height", d => innerHeight - yScale(d.length));
    };

    d3.select("#filters_screen")
    .selectAll(".filter")
    .data(filters_screen)
    .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            console.log("Clicked filter:", e);
            console.log("Clicked filter data:", d);

        // If the clicked filter is not already active, update the active state of the filters
        if(!d.isActive) {
            // make sure button clicked is not already active
            filters_screen.forEach(filter => {
                filter.isActive = d.id == filter.id ? true : false;
            });

            // Change to selectAll so ALL buttons update their color
            d3.selectAll("#filters_screen .filter")
                .classed("active", filter => filter.id == d.id ? true : false);

            // Call the update function so the chart actually redraws
            updateHistogram(d.id, data);
        }
    });
}

// Tooltip for Exercise 6.3
// Step 1 : Create the structure
// This function builds an invisible tooltip box and attaches it to scatterplot.
const createTooltip = () => {
    // Append a group for the tooltip to the scatterplot and hide it initially (opacity: 0)
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Add the background rectangle for the tooltip box
    tooltip
        .append("rect")
        .attr("width", tooltipWidth) // Assumes tooltipWidth is in shared-constants.js
        .attr("height", tooltipHeight) // Assumes tooltipHeight is in shared-constants.js
        .attr("rx", 3) // Rounds the corners
        .attr("ry", 3) 
        .attr("fill", barColor) // Uses the global bar color
        .attr("fill-opacity", 0.75); // Makes it slightly transparent

    // Add placeholder text ("NA") to the tooltip
    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2) // Centers text horizontally
        .attr("y", (tooltipHeight / 2) + 2) // Centers text vertically
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 900);
};

// 2. HANDLE MOUSE INTERACTIONS
const handleMouseEvents = () => {
    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            console.log("Mouse entered circle", d);

            // Step 1: Update the tooltip text with the screen size of the hovered TV
            d3.select(".tooltip text")
                .text(d.screenSize); 

            // Step 2: Find exactly where the hovered circle is located on the screen
            const cx = e.target.getAttribute("cx");
            const cy = e.target.getAttribute("cy");

            // Step 3: Move the tooltip to hover just above the circle and smoothly fade it in
            d3.select(".tooltip")
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1); 
        })
        .on("mouseleave", (e, d) => {
            console.log("Mouse left circle", d);

            // Step 4: Instantly make the tooltip invisible again and banish it off-screen
            d3.select(".tooltip")
                .style("opacity", 0)
                .attr("transform", `translate(0, 500)`); 
        });
};
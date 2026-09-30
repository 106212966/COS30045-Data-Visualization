const populateFilters = (data) => {
    // Array of filter options for screen types
    const filters_screen = [
        { id: "all", label: "All", isActive: true },
        { id: "LED", label: "LED", isActive: false },
        { id: "LCD", label: "LCD", isActive: false },
        { id: "OLED", label: "OLED", isActive: false }
    ];

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
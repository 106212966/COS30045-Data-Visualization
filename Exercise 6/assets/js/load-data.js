// Define the file path
const dataset = "assets/data/Ex6_TVdata_withStar.csv";

// Load the data using D3 v7 (Promise-based)
d3.csv(dataset, function(d) {
    // Row conversion function: convert numeric strings to numbers
    return {
        brand: d.brand,
        model: d.model,
        screenSize: +d.screenSize,         // Convert to number
        screenTech: d.screenTech,
        star: +d.star,                     // Convert to number
        energyConsumption: +d.energyConsumption // Convert to number
    };
}).then(function(data) {
    // Execution block: Data is successfully loaded and converted
    console.log("Data successfully loaded!");
    console.table(data); // Displays a neat table in your browser's developer console

    drawHistogram(data);
    populateFilters(data);

    // Add new functions for Exercise 6.3 and 6.4
    drawScatterplot(data);
    createTooltip();
    handleMouseEvents();
    
}).catch(function(error) {
    // Error handling block
    console.error("Error loading the CSV file:", error);
});
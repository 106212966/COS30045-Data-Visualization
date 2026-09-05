# Exercise 3 – Data Story: TV Energy Consumption

## Overview

In this exercise, you will develop a **data story** based on the **TV Energy Consumption dataset**. Using the website created in **Exercise 0.2**, you will extend your work to present a meaningful narrative supported by data visualisations.

Your goal is to communicate insights from the dataset in a clear and engaging way through your **website and written explanation**.

You must use the **Exercise 3 folder in your existing forked repository** and reuse the files created in **Exercise 0.2**.

---

## Data Story

### Audience

The target audience for this visualisation includes:

- **Budget-conscious families** setting up a living room entertainment system.
- **First-time apartment renters** looking to find the best balance between screen size and ongoing living expenses.
- **Everyday retail shoppers** who want to understand the standard market offerings and avoid utility bill shock.

These audiences are often overwhelmed by the sheer number of TV sizes available in stores. They are specifically interested in knowing what the "normal" or most popular TV size is, and exactly how much it costs to run a Small, Medium, or Large TV on average.

### Story Overview

This visualisation explores the current television market landscape and its direct financial impact on household energy bills.

The goal is to help viewers understand:

- **Storyboard 1 (Size Frequency):** How frequent each TV size is on the market, helping consumers understand that standard sizes (like 140 cm / 55-inch) dominate the market, while massive screens are actually extreme outliers.
- **Storyboard 2 (Average Cost by Category):** The average energy consumption mapped to distinct size categories (Small: <44", Medium: 44" to 65", Large: >65"), showing the massive financial jump-scare when upgrading to the "Large" tier.
- Actionable rules of thumb that empower consumers to choose a television category that fits both their physical living space and their monthly budget.

The website presents these insights through two distinct storyboards featuring visualisations and explanatory text that guide the viewer through the data.

---

## About the Data

### Data Source

The dataset used in this project contains information about **television models and their energy consumption characteristics**, focusing specifically on the physical screen size (`screensize`) and power usage measured as **Labelled energy consumption (kWh/year)**.

The dataset was provided as part of the course materials.

### Data Processing

Before creating visualisations, the dataset was processed in KNIME to ensure it was suitable for our specific narrative. This included:

- Cleaning missing or inconsistent values.
- Using an Expression node to group raw screen sizes into three realistic consumer categories for fair comparison:
  - **Small:** Less than 44 inches
  - **Medium:** 44 inches to 65 inches
  - **Large:** Greater than 65 inches
- Aggregating the data to find the exact frequency of sizes across the market, and calculating the average energy consumption for each created category tier.

### Privacy

The dataset does not contain any **personal or sensitive information**. It focuses solely on product specifications and energy consumption data related to television devices.

### Accuracy and Limitations

While the dataset provides useful information about TV energy consumption, there are some limitations:

- The dataset may not include **all available television models** currently on the market.
- Some information may be **outdated or incomplete**.
- Energy consumption may vary depending on **real-world usage conditions**. The kWh/year is based on standardized laboratory testing hours. Actual yearly consumption will vary based on a family's daily viewing habits, HDR brightness settings, and ambient room lighting.

These factors should be considered when interpreting the visualisations.

### Ethics

When presenting data visualisations, it is important to ensure that the information is represented **accurately and responsibly**.

This project follows ethical data visualisation practices by:

- Grouping sizes into fair, objective categories (Small, Medium, Large) rather than manipulating axes to exaggerate energy costs.
- Clearly explaining the context of the data and separating market hype from data reality.
- Presenting information transparently so viewers can interpret the market standards correctly and make their own financial decisions.

---

## AI Declaration

Artificial Intelligence (AI) tools may have been used to assist with aspects of this assignment, such as:

- Generating example code
- Improving code structure
- Assisting with documentation writing

All AI-generated assistance was reviewed, modified where necessary, and integrated responsibly into the project.

---

## Website Storytelling

The website has been updated to communicate a **data-driven story** based on the TV energy consumption dataset, split into two dedicated storyboard pages.

The website includes:

- **Storyboard 1 :** An interactive, hand-drawn visual layout featuring a chart on TV size frequency, establishing what sizes are most common for the average buyer.
- **Storyboard 2 :** A gaming-themed layout featuring a comparative chart that shows the average energy consumption for Small, Medium, and Large TV categories.
- Contextual text explanations that help readers connect the data to real-world implications (like showroom intimidation and electricity bills).

The aim is to guide the viewer through the data in a way that is **informative, engaging, and easy to understand**.
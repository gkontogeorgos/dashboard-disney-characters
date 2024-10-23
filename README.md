
# Dashboard with data table and pie chart for disney characters

This project allows you to search and fetch data of disney characters on a table and update the pie chart based on that data, and also dynamically configure a pie chart's settings (like `legend` and `size`) through a user-friendly interface.

## Features

- **Fetching Data in the table:** Smooth fetching for data of any size.
- **Searching and setting paging in the table:** Feature to search disney characters and fetch conditional data based on paging.
- **Pie Chart Data based on table's data:** Pie chart's data is updated based on the table data on real time.
- **Dynamic Configurations:** Easily modify nested pie chart settings using a simple UI.
- **Efficient State Management:** The app uses React's state hooks to update configurations immutably.
- **Responsive Design:** The layout adjusts smoothly using Material-UI's `Grid2` component.

## How It Works

- It supports deep updates for nested objects, ensuring immutability by creating shallow copies as necessary.
- When the application fetches the data table, it simultaneously updates the pie chart data.
- Additionally, when a user searches for a Disney character, both the table data and the pie chart data are updated simultaneously, providing a synchronized view of the filtered results.

## Installation

To run the project locally, follow these steps:

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the application:
   ```bash
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`.

## Dependencies

- React
- Material-UI (MUI)
- Highcharts

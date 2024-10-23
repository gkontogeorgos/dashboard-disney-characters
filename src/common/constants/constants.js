const ChartTypes = {
  PIE: "pie",
  DONUT: "donut",
  "SEMI CIRCLE": "semicircle",
  GRADIENT: "gradient",
  MONOCHROME: "monochrome",
};

const yesNoOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];
const legendLayoutOptions = ["horizontal", "vertical"];
const legendLayoutAlign = ["right", "left"];
const pieChartMinSizeOptions = [100, 300, 500];

export {
  ChartTypes,
  yesNoOptions,
  legendLayoutOptions,
  legendLayoutAlign,
  pieChartMinSizeOptions,
};

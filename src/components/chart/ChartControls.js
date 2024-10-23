import React, { memo } from "react";
import {
  Select,
  MenuItem,
  Grid2,
  InputLabel,
  FormControl,
  Tooltip,
  IconButton,
} from "@mui/material";
import "./CharacterPieChart.css";
import { ChartTypes, pieChartMinSizeOptions } from "common/constants/constants";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const ChartControls = ({
  chartType,
  setChartType,
  pieChartConfig,
  handlePieChartConfigChange,
  exportToExcel,
}) => (
  <Grid2
    container
    spacing={2}
    style={{ marginBottom: 20, justifyContent: "center" }}
  >
    <Grid2 sx={{ xs: 6, sm: 3 }} size={4}>
      <FormControl fullWidth>
        <InputLabel>Select Pie Chart Type</InputLabel>
        <Select
          fullWidth
          label="Select Pie Chart Type"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          {Object.entries(ChartTypes).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {key.charAt(0) + key.slice(1).toLowerCase()} Chart
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 sx={{ xs: 12, sm: 6 }} size={4}>
      <FormControl fullWidth>
        <InputLabel>Select Pie Chart Size</InputLabel>
        <Select
          fullWidth
          label="Select Pie Chart Size"
          value={pieChartConfig?.minSize}
          onChange={(e) =>
            handlePieChartConfigChange("minSize", parseInt(e.target.value, 10))
          }
        >
          {pieChartMinSizeOptions.map((size) => (
            <MenuItem key={size} value={size}>
              {size} %
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 sx={{ xs: 6, sm: 3 }} size={4} style={{ textAlign: "right" }}>
      <Tooltip title="Export chart data" arrow>
        <IconButton
          onClick={exportToExcel}
          style={{ backgroundColor: "green", color: "white" }}
        >
          <CloudDownloadIcon />
        </IconButton>
      </Tooltip>
    </Grid2>
  </Grid2>
);

export default memo(ChartControls);

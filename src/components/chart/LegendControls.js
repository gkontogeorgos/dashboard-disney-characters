import React, { memo } from "react";
import {
  Select,
  MenuItem,
  Grid2,
  InputLabel,
  FormControl,
} from "@mui/material";
import "./CharacterPieChart.css";
import {
  legendLayoutAlign,
  legendLayoutOptions,
  yesNoOptions,
} from "common/constants/constants";

const LegendControls = ({ pieChartConfig, handlePieChartConfigChange }) => (
  <Grid2
    container
    spacing={2}
    size={12}
    style={{ marginTop: 20, justifyContent: "center" }}
  >
    <Grid2 sx={{ xs: 12, sm: 6 }} size={4}>
      <FormControl fullWidth>
        <InputLabel>Show legend</InputLabel>
        <Select
          fullWidth
          label="Show Legend"
          value={pieChartConfig.legend.enabled}
          onChange={(e) =>
            handlePieChartConfigChange("legend.enabled", e.target.value)
          }
        >
          {yesNoOptions.map(({ label, value }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 sx={{ xs: 12, sm: 6 }} size={4}>
      <FormControl fullWidth>
        <InputLabel>Choose Layout</InputLabel>
        <Select
          fullWidth
          label="Choose Layout"
          value={pieChartConfig.legend.layout}
          disabled={!pieChartConfig.legend.enabled}
          onChange={(e) =>
            handlePieChartConfigChange("legend.layout", e.target.value)
          }
        >
          {legendLayoutOptions.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
    <Grid2 sx={{ xs: 12, sm: 6 }} size={4}>
      <FormControl fullWidth>
        <InputLabel htmlFor="add-legend-select">Set Alignment</InputLabel>
        <Select
          fullWidth
          label="Show legend"
          value={pieChartConfig.legend.align}
          disabled={!pieChartConfig.legend.enabled}
          onChange={(e) =>
            handlePieChartConfigChange("legend.align", e.target.value)
          }
        >
          {legendLayoutAlign.map((el) => (
            <MenuItem key={el} value={el}>
              {el}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
  </Grid2>
);

export default memo(LegendControls);

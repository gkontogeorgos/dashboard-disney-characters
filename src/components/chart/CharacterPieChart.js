import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as XLSX from "xlsx";
import "./CharacterPieChart.css";
import LegendControls from "./LegendControls";
import { ChartTypes } from "common/constants/constants";
import ChartControls from "./ChartControls";

const pieChartDefaultConfig = {
  chart: {
    type: "pie",
    backgroundColor: "#f8f9fa",
    animation: true,
  },
  loading: {
    position: "absolute",
    backgroundColor: "#ffffff",
    opacity: 0.5,
    textAlign: "center",
  },
  title: {
    text: "Characters by Number of Films",
  },
  tooltip: {
    pointFormat:
      "{point.name}: <b>{point.percentage:.1f}%</b> ({point.y})<br/>Films: {point.films}",
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      showInLegend: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b>: {point.percentage:.1f}% ({point.y})",
      },
      // Setting below default pie config options to undefined so that changing to other pie types is always smooth and should work as expected
      innerSize: undefined,
      startAngle: undefined,
      endAngle: undefined,
      colors: undefined,
    },
  },
  credits: {
    enabled: false,
  },
  accessibility: {
    enabled: false,
  },
};

const initialPieConfigOptions = {
  minSize: 300,
  legend: {
    enabled: false,
    layout: "vertical",
    align: "left",
    itemStyle: {
      fontSize: 12,
    },
  },
};

const CharacterPieChart = () => {
  const { list } = useSelector((state) => state.characters);
  const [chartType, setChartType] = useState(ChartTypes.PIE);
  const [filteredList, setFilteredList] = useState([]);
  const [pieChartConfig, setPieChartConfig] = useState(initialPieConfigOptions);

  const handlePieChartConfigChange = (key, value) => {
    setPieChartConfig((prev) => {
      const newConfig = { ...prev };
      const keys = key.split(".");
      keys.reduce((acc, k, index) => {
        if (index === keys.length - 1) {
          acc[k] = value;
        } else {
          acc[k] = { ...acc[k] };
        }
        return acc[k];
      }, newConfig);
      return newConfig;
    });
  };

  useEffect(() => {
    const filtered = list?.length > 0 ? list : [];
    setFilteredList([...filtered, list]);
  }, [list]);

  const chartData = useMemo(() => {
    return filteredList?.length > 0
      ? filteredList
          .map((character) => ({
            name: character?.name,
            y: character?.films?.length,
            films: character?.films,
          }))
          .sort((a, b) => b.y - a.y)
      : [];
  }, [filteredList]);

  const chartOptions = useMemo(() => {
    const baseOptions = {
      ...pieChartDefaultConfig,
      plotOptions: {
        ...pieChartDefaultConfig.plotOptions,
        pie: {
          ...pieChartDefaultConfig.plotOptions.pie,
          minSize: pieChartConfig.minSize,
          showInLegend: pieChartConfig.legend.enabled,
        },
      },
      legend: pieChartConfig.legend,
      series: [
        {
          name: "Characters",
          colorByPoint: true,
          data: chartData,
        },
      ],
    };

    switch (chartType) {
      case ChartTypes.PIE:
        break;
      case ChartTypes.DONUT:
        baseOptions.plotOptions.pie.innerSize = "50%";
        break;
      case ChartTypes["SEMI CIRCLE"]:
        baseOptions.plotOptions.pie.startAngle = -90;
        baseOptions.plotOptions.pie.endAngle = 90;
        break;
      case ChartTypes.GRADIENT:
        baseOptions.plotOptions.pie.colors = Highcharts.map(
          Highcharts.getOptions().colors,
          (color) => ({
            radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
            stops: [
              [0, color],
              [1, Highcharts.color(color).brighten(-0.3).get("rgb")],
            ],
          })
        );
        break;
      case ChartTypes.MONOCHROME:
        baseOptions.plotOptions.pie.colors = Highcharts.getOptions().colors.map(
          (color) => Highcharts.color(color).brighten(0.1).get()
        );
        break;
      default:
        break;
    }

    return baseOptions;
  }, [chartData, chartType, pieChartConfig]); // Include pieChartConfig in dependency array

  const exportToExcel = () => {
    const dataToExport = filteredList.map((character) => ({
      "Character Name": character.name || "--",
      "Number of Films": character.films?.length || 0,
      Films: character.films?.join(", ") || "--",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Characters");
    XLSX.writeFile(workbook, "disney_characters.xlsx");
  };

  return (
    <div className="card-container">
      <ChartControls
        chartType={chartType}
        setChartType={setChartType}
        pieChartConfig={pieChartConfig}
        handlePieChartConfigChange={handlePieChartConfigChange}
        exportToExcel={exportToExcel}
      />
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <LegendControls
        pieChartConfig={pieChartConfig}
        handlePieChartConfigChange={handlePieChartConfigChange}
      />
    </div>
  );
};

export default CharacterPieChart;

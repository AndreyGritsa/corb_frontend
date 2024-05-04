import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { axisClasses } from "@mui/x-charts";

const chartSetting = {
  yAxis: [
    {
      label: "kg",
    },
  ],
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
  height: 300,
};

const valueFormatter = (value: number | null) => `${value}kg`;

export default function BasicBarsChartMus({ data }: { data: [] }) {
  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "when" }]}
        series={[
          {
            dataKey: "value",
            label: "Masa muscular",
            valueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </Box>
  );
}

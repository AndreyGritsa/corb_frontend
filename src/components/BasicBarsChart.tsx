import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import Box from "@mui/material/Box";

const chartSetting = {
  yAxis: [
    {
      label: "mm",
    },
  ],

  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

const valueFormatter = (value: number | null) => `${value}mm`;

export default function BasicBarsChart({ data }: { data: [] }) {
  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: "band", dataKey: "when" }]}
        series={[
          {
            dataKey: "Pliegue Cresta ilíaca",
            label: "Pliegue Cresta ilíaca",
            valueFormatter,
          },
          {
            dataKey: "Pliegue Supraespinal",
            label: "Pliegue Supraespinal",
            valueFormatter,
          },
          {
            dataKey: "Pliegue Abdominal",
            label: "Pliegue Abdominal",
            valueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </Box>
  );
}

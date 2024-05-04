import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const chartSetting = {
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-10px, 0)",
    },
  },
};

const valueFormatter = (value: number | null, unit: string) =>
  `${value}${unit}`;

export default function BasicLineChart({
  previousData,
  unit,
  label,
}: {
  previousData: any;
  unit: string;
  label: string;
}) {
  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <LineChart
        dataset={previousData}
        yAxis={[{ label: unit }]}
        xAxis={[{ scaleType: "band", dataKey: "title" }]}
        series={[
          {
            dataKey: "value",
            label: label,
            valueFormatter: (value) => valueFormatter(value, unit),
          },
        ]}
        // width={600}
        height={300}
        {...chartSetting}
      />
    </Box>
  );
}

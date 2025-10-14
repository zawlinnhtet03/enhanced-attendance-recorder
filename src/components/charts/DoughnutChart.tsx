"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export type DoughnutChartProps = {
  labels: string[];
  data: number[];
  height?: number; // px
  colors?: string[]; // rgba strings
  cutout?: string | number; // e.g. '65%'
};

export default function DoughnutChart({ labels, data, height = 260, colors, cutout = "65%" }: DoughnutChartProps) {
  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: "Count",
        data,
        backgroundColor: colors || [
          "rgba(0, 122, 255, 0.70)",
          "rgba(0, 200, 255, 0.62)",
          "rgba(82, 109, 255, 0.62)",
          "rgba(180, 200, 255, 0.70)",
        ],
        borderWidth: 0,
      },
    ],
  }), [labels, data, colors]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const },
      tooltip: { enabled: true },
    },
    cutout,
  }), [cutout]);

  return (
    <div style={{ height }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

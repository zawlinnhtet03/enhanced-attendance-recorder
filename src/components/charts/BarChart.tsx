"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export type BarChartProps = {
  title?: string;
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    color?: string; // rgba color
  }>;
  height?: number; // px
};

export default function BarChart({ title, labels, datasets, height = 260 }: BarChartProps) {
  const data = useMemo(() => {
    return {
      labels,
      datasets: datasets.map((d, i) => ({
        label: d.label,
        data: d.data,
        backgroundColor: d.color || `rgba(${i === 0 ? "0, 122, 255" : "0, 200, 255"}, ${i === 0 ? "0.75" : "0.6"})`,
        borderRadius: 6,
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      })),
    };
  }, [labels, datasets]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom" as const },
      tooltip: { enabled: true },
      title: { display: !!title, text: title },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#eef2f7" }, ticks: { precision: 0 } },
    },
  }), [title]);

  return (
    <div style={{ height }}>
      <Bar options={options} data={data} />
    </div>
  );
}

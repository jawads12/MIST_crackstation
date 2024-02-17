import React from "react";
import { Line } from "react-chartjs-2";

function LineChart() {
  return (
    <Line
      options={{
        maintainAspectRatio: true,
        responsive: true,
      }}
      data={{
        labels: ["1", "2", "3", "4", "5", "6", "7","1", "2", "3", "4", "5", "6", "7","1", "2", "3", "4", "5", "6", "7","1", "2", "3", "4", "5", "6", "7"],
        datasets: [
          {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
            pointRadius: 0,
          },
        ],
      }}
    />
  );
}

export default LineChart;

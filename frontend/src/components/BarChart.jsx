import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart() {
  return (
    <Bar
      options={{
        maintainAspectRatio: true,
        responsive: true,
      }}
      data={{
        labels: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednessday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        datasets: [
          {
            label: "Number of sample",
            data: [200, 300, 400, 500, 200, 100, 50],
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 205, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(201, 203, 207, 0.6)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
          },
        ],

        borderWidth: 1,
      }}
    />
  );
}

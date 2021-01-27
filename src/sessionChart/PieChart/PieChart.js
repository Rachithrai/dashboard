import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import { COLORS } from "../../constants/styles";

function PieChart(props) {
  const canvas = useRef();

  useEffect(() => {
    const cfg = {
      type: "pie",
      data: {
        labels: props.data.map((d) => d.label),

        datasets: [
          {
            data: props.data.map((d) => d.value),
            backgroundColor: [
              COLORS.primary,
              COLORS.tertiary,
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            top: 50,
          },
        },
        legend: {
          labels: {
            boxWidth: 15,
            fontSize: 14,
          },
          align: "center",
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
    const chart = new Chart(canvas.current.getContext("2d"), cfg);
    return () => chart.destroy();
  }, [props.data]);

  return (
    <div style={{ height: 300, width: 350 }}>
      <canvas ref={canvas} />
    </div>
  );
}

export default PieChart;

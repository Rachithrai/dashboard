import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import { COLORS } from "../../constants/styles";

function LineChart(props) {
  const lineChart = useRef(null);

  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (props.data.length > 0 && !chartInstance) {
      const newChartInstance = new Chart(lineChart.current, {
        type: "line",
        data: {
          labels: props.data.map((d) => d.time),

          datasets: [
            {
              label: ["Sessions"],
              data: props.data.map((d) => d.value),
              fill: "start",
              backgroundColor: COLORS.secondary,
              pointRadius: 3,
              borderColor: COLORS.primary,
              borderWidth: 1,
              lineTension: 0,
              pointBackgroundColor: COLORS.primary,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              right: 50,
              top: 20,
            },
          },
          legend: {
            labels: {
              usePointStyle: true,
              padding: 15,
            },
            align: "start",
          },
          scales: {
            xAxes: [
              {
                type: "time",
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  min: 0,
                  stepSize: 50,
                  max: 100,
                },
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      setChartInstance(newChartInstance);
    } else {
      console.log(props, lineChart);
      if (props.data.length > 0 && chartInstance) {
        chartInstance.data.datasets[0].data = props.data.map((d) => d.value);
        chartInstance.data.labels = props.data.map((d) => d.time);
        chartInstance.update();
      }
    }
  }, [props, chartInstance]);

  return (
    <div style={{ height: "275px" }}>
      <canvas ref={lineChart} />
    </div>
  );
}

export default LineChart;

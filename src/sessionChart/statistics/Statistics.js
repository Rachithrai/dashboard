import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import { COLORS } from "../../constants/styles";
const data = {
  type: "line",
  options: {
    layout: {
      padding: {
        right: 10,
        top: 50,
      },
    },
    legend: {
      align: "start",
      labels: {
        boxWidth: 0,
        fontSize: 14,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            max: 100,
            display: false,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
  },
};

const subData = {
  fill: "start",
  backgroundColor: COLORS.secondary,
  pointRadius: 0,
  borderColor: COLORS.primary,
  borderWidth: 1,
  lineTension: 0,
};

function Statistics(props) {
  const userChart = useRef();
  const pageViewChart = useRef();
  const pageSessionChart = useRef();
  const averagSessionChart = useRef();
  const bounceRate = useRef();
  const newSession = useRef();

  const [chart1, setChart1] = useState(null);
  const [chart2, setChart2] = useState(null);
  const [chart3, setChart3] = useState(null);
  const [chart4, setChart4] = useState(null);
  const [chart5, setChart5] = useState(null);
  const [chart6, setChart6] = useState(null);

  useEffect(() => {
    const initializeChart = (setState, reference, key, title) => {
      const object = {
        ...data,
        data: {
          labels: props.data[key].map((d) => d.label),
          datasets: [
            {
              data: props.data[key].map((d) => d.value),
              ...subData,
              label: title,
            },
          ],
        },
      };
      const newChart3 = new Chart(reference, object);
      setState(newChart3);
    };

    console.log(props, Object.keys(props.data), chart1, userChart.current);
    if (!chart1 && Object.keys(props.data).length > 0) {
      initializeChart(setChart1, userChart.current, "userChart", "Users");
      initializeChart(
        setChart2,
        pageViewChart.current,
        "pageViewChart",
        "Page Views"
      );
      initializeChart(
        setChart3,
        pageSessionChart.current,
        "pageSessionChart",
        "Pages/Sessions"
      );
      initializeChart(
        setChart4,
        averagSessionChart.current,
        "averageSessionChart",
        "Avg. Session Duration"
      );
    } else {
      console.log("there");
      if (Object.keys(props.data).length > 0 && chart1) {
        [
          { object: chart1, key: "userChart" },
          { object: chart2, key: "pageViewChart" },
          { object: chart3, key: "pageSessionChart" },
          { object: chart4, key: "averageSessionChart" },
        ].map((item) => {
          item.object.data.datasets[0].data = props.data[item.key].map(
            (d) => d.value
          );
          item.object.data.labels = props.data[item.key].map((d) => d.label);
          item.object.update();
          return null;
        });
      }
    }
  }, [chart1, props, chart2, chart3, chart4]);

  return (
    <>
      <div style={{ height: "150px", width: "230px", marginRight: 20 }}>
        <canvas ref={userChart} />
      </div>
      <div style={{ height: "150px", width: "230px", marginRight: 20 }}>
        <canvas ref={pageViewChart} />
      </div>
      <div style={{ height: "150px", width: "230px", marginRight: 20 }}>
        <canvas ref={pageSessionChart} />
      </div>
      <div style={{ height: "150px", width: "230px", marginRight: 20 }}>
        <canvas ref={averagSessionChart} />
      </div>
      {/* <div style={{ height: "150px", width: "200px" }}>
        <canvas ref={userChart} />
      </div>
      <div style={{ height: "150px", width: "200px" }}>
        <canvas ref={userChart} />
      </div>  */}
    </>
  );
}

export default Statistics;

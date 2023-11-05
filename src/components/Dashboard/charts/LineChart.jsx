// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

// Line Chart: Show the trend in sales and revenue over time.
const LineChart = ({ order }) => {
  const orderDates = order
    .map((item) => {
      // Format the date as "yyyy-mm-dd"
      const date = new Date(item.orderDate);
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      return formattedDate;
    })
    .sort();

  const revenue = order.map((item) => parseFloat(item.totalAmount));

  const lineChartData = {
    labels: orderDates,
    datasets: [
      {
        label: "Revenue",
        data: revenue,
        fill: false,
        borderColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Line data={lineChartData} />;
};

export default LineChart;

// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = ({ order }) => {
  const orderStatuses = order.reduce((acc, item) => {
    const status = item.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Define custom colors for each status
  const statusColors = {
    Pending: "rgba(255, 99, 132, 0.6)",
    Accepted: "rgba(54, 162, 235, 0.6)",
    Rejected: "rgba(255, 206, 86, 0.6)",
    Packed: "rgba(75, 192, 192, 0.6)",
    Dispatched: "rgba(153, 102, 255, 0.6)",
    Delivered: "rgba(255, 159, 64, 0.6)",
    Returned: "rgba(143, 36, 179, 0.6)",
  };

  const pieChartData = {
    labels: Object.keys(orderStatuses),
    datasets: [
      {
        data: Object.values(orderStatuses),
        backgroundColor: Object.keys(orderStatuses).map(
          (status) => statusColors[status]
        ),
      },
    ],
  };
  return <Pie data={pieChartData} />;
};

export default PieChart;

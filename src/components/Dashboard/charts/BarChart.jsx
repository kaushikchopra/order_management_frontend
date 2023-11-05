// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

// Bar Chart: Display monthly or yearly sales comparisons.
const BarChart = ({ order }) => {
  const monthlySales = order.reduce((acc, item) => {
    const date = new Date(item.orderDate);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    acc[monthYear] = (acc[monthYear] || 0) + 1;
    return acc;
  }, {});

  // Sort the x-axis labels in ascending order based on mm-yyyy format
  const sortedLabels = Object.keys(monthlySales).sort((a, b) => {
    const [aMonth, aYear] = a.split("-");
    const [bMonth, bYear] = b.split("-");
    return new Date(aYear, aMonth - 1) - new Date(bYear, bMonth - 1);
  });

  const barChartData = {
    labels: sortedLabels,
    datasets: [
      {
        label: "Monthly Sales",
        data: sortedLabels.map((label) => monthlySales[label]),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={barChartData} />;
};

export default BarChart;

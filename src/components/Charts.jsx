import { memo } from "react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
   ArcElement,
   PointElement,
   LineElement,
   Filler,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
   ArcElement,
   PointElement,
   LineElement,
   Filler
);

const months = ["January", "February", "March", "April", "May", "June", "July"];

const BarChart = ({
   data_1 = [],
   data_2 = [],
   title_1,
   title_2,
   bgColor_1,
   bgColor_2,
   horizontal = false,
   labels = months,
   height = "100%"
}) => {
   const options = {
      responsive: true,
      indexAxis: horizontal ? "y" : "x",
      plugins: {
         legend: {
            display: false,
         },
         title: {
            display: false,
         },
      },

      scales: {
         y: {
            beginAtZero: true,
            grid: {
               display: false,
            },
         },
         x: {
            grid: {
               display: false,
            },
         },
      },
   };

   const data = {
      labels,
      datasets: [
         {
            label: title_1,
            data: data_1,
            backgroundColor: bgColor_1,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4,
         },
         {
            label: title_2,
            data: data_2,
            backgroundColor: bgColor_2,
            barThickness: "flex",
            barPercentage: 1,
            categoryPercentage: 0.4,
         },
      ],
   };

   return <Bar options={options} data={data} height={height} />;
};


const PieChart = ({
   labels,
   data,
   backgroundColor,
   offset,
}) => {

   const generateColors = (numColors) => {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
         colors.push(`hsl(${(i * (360 / numColors)) % 360}, 70%, 50%)`);
      }
      return colors;
   };

   const pieChartData = {
      labels,
      datasets: [
         {
            data,
            backgroundColor: backgroundColor ? backgroundColor : generateColors(data.length),
            borderWidth: 1,
            offset,
         },
      ],
   };

   const pieChartOptions = {
      responsive: true,
      plugins: {
         legend: {
            display: true,
            position: "bottom",
         },
      },
   };

   return <Pie data={pieChartData} options={pieChartOptions} />;
};


const LineChart = ({
   data,
   label,
   backgroundColor,
   borderColor,
   labels = months,
}) => {
   const options = {
      responsive: true,
      plugins: {
         legend: {
            display: false,
         },
         title: {
            display: false,
         },
      },

      scales: {
         y: {
            beginAtZero: true,
            grid: {
               display: false,
            },
         },
         x: {
            grid: {
               display: false,
            },
         },
      },
   };

   const lineChartData = {
      labels,
      datasets: [
         {
            fill: true,
            label,
            data,
            backgroundColor,
            borderColor,
         },
      ],
   };

   return <Line options={options} data={lineChartData} />;
};

const MemoizedBarChart = memo(BarChart);
const MemoizedPieChart = memo(PieChart);
const MemoizedLineChart = memo(LineChart);
export { MemoizedBarChart as BarChart, MemoizedPieChart as PieChart, MemoizedLineChart as LineChart };
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

interface ChartDataProps {
  chartData: {
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderColor: string;
      borderWidth: number;
    }[];
  };
}

function PieChart({ chartData }: ChartDataProps) {
  return (
    <div className="chart-container flex justify-center">
      <Doughnut data={chartData} />
    </div>
  );
}
export default PieChart;

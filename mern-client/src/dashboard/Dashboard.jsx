import React, { useEffect, useState, useRef } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const totalRevenueRef = useRef(0);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then(response => response.json())
      .then(data => {
        setOrders(data);
        totalRevenueRef.current = data.reduce((acc, order) => acc + order.amount, 0) / 100;
      })
      .catch(error => console.error("Error fetching orders:", error));
  }, []);

  useEffect(() => {
    // Clean up the previous chart instances before creating new ones
    if (barChartRef.current) barChartRef.current.destroy();
    if (pieChartRef.current) pieChartRef.current.destroy();
    if (lineChartRef.current) lineChartRef.current.destroy();

    const orderAmounts = orders.map(order => order.amount / 100);
    const orderIds = orders.map(order => order.id);
    const orderDates = orders.map(order => new Date(order.created * 1000).toLocaleDateString());
    const orderStatuses = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    const barData = {
      labels: orderIds,
      datasets: [
        {
          label: 'Order Amount (USD)',
          data: orderAmounts,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const pieData = {
      labels: Object.keys(orderStatuses),
      datasets: [
        {
          label: 'Order Status',
          data: Object.values(orderStatuses),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
        },
      ],
    };

    const lineData = {
      labels: orderDates,
      datasets: [
        {
          label: 'Order Trends',
          data: orderAmounts,
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    barChartRef.current = new Chart(document.getElementById('barChart'), {
      type: 'bar',
      data: barData,
      options: options,
    });

    pieChartRef.current = new Chart(document.getElementById('pieChart'), {
      type: 'pie',
      data: pieData,
    });

    lineChartRef.current = new Chart(document.getElementById('lineChart'), {
      type: 'line',
      data: lineData,
      options: options,
    });

    // Clean up the chart instances on unmount
    return () => {
      if (barChartRef.current) barChartRef.current.destroy();
      if (pieChartRef.current) pieChartRef.current.destroy();
      if (lineChartRef.current) lineChartRef.current.destroy();
    };
  }, [orders]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Total Revenue</h3>
          <p className="text-2xl">${totalRevenueRef.current.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Order Amounts</h3>
          <canvas id="barChart"></canvas>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Order Status Distribution</h3>
          <canvas id="pieChart"></canvas>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">Order Trends</h3>
          <canvas id="lineChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

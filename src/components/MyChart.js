import React from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['0', '2', '4', '6', '8', '10'],
    datasets: [
        {
            label: 'Gas',
            data: [1, 1, 0, 1, 0, 1],
            fill: false,
            backgroundColor: 'green',
            borderColor: 'green',
            borderDash: [20, 5],
        },
        {
            label: 'Flame',
            data: [1, 0, 1, 1, 0, 1],
            fill: false,
            backgroundColor: 'red',
            borderColor: 'red',
            borderDash: [10, 5],
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

const MyChart = () => {
    return (
        <>
            <Line data={data} options={options} />
        </>
    )
};

export default MyChart;
import React from 'react';
import { Line } from 'react-chartjs-2';


const options = {
    scales: {
        y: {
            beginAtZero: true
        },

    },
    animation: {
        duration: 0
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Status Realtime Chart',
            font: {
                size: 22,
                weight: 'bold',
                lineHeight: 1.2,
            },
        },
    },
};

const StatusChart = ({ labels, gasData, flameData }) => {
    const data = {
        labels,
        datasets: [
            {
                label: 'Gas',
                data: gasData,
                fill: false,
                backgroundColor: '#dbdbdb',
                borderColor: '#8c8c8c',
            },
            {
                label: 'Flame',
                data: flameData,
                fill: false,
                backgroundColor: '#FFB1C1',
                borderColor: '#FF6384',
            },
        ],
    };

    return (
        <>
            <Line height={100} data={data} options={options} />
        </>
    )
};

export default StatusChart;
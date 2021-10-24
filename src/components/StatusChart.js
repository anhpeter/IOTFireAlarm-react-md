import React from 'react';
import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';


const options = {
    scales: {
        y: {
            beginAtZero: true
        }
    },
    animation:{
        duration: 0
    }
};

const StatusChart = ({ labels, gasData, flameData }) => {
    const data = {
        labels,
        datasets: [
            {
                label: 'Gas',
                data: gasData,
                fill: false,
                backgroundColor: 'white',
                borderColor: 'green',
                borderDash: [20, 5],
            },
            {
                label: 'Flame',
                data: flameData,
                fill: false,
                backgroundColor: 'white',
                borderColor: 'red',
                borderDash: [10, 5],
            },
        ],
    };

    return (
        <>
            <Line data={data} options={options} />
        </>
    )
};

export default StatusChart;
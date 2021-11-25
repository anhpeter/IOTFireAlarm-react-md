import React from 'react';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const Wrapper = styled.div`
    box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
`;

const StatusChart = ({ labels, gasData, flameData, title }) => {
    const options = {
        maintainAspectRatio: false,
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
                text: title,
                font: {
                    size: 22,
                    weight: 'bold',
                    lineHeight: 1.2,
                },
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Gas',
                data: gasData,
                fill: false,
                backgroundColor: '#dbdbdb',
                borderColor: '#8c8c8c',
                borderDash: [10, 5]
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
            <Wrapper>
                <Line height={250} data={data} options={options} />
            </Wrapper>
        </>
    )
};

export default StatusChart;
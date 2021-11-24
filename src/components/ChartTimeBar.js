import React from 'react'

export default function ChartTimeBar({ chartTimeInHour, onTimeChange }) {
    const data = [
        {
            value: 1,
            text: '1 hour',
        },
        {
            value: 6,
            text: '6 hours',
        },
        {
            value: 24,
            text: '1 day',
        },
        {
            value: 24 * 7,
            text: '7 days',
        },
        {
            value: 24 * 30,
            text: '30 days',
        },
    ]
    const buttons = data.map(item => {
        const color = item.value === chartTimeInHour ? 'btn-primary' : 'btn-light';
        return <button key={item.value} onClick={onTimeChange.bind(this, item.value)} type="button" className={`btn ${color}`}>{ item.text }</button>
    })
    return (
        <div>
            <div className="btn-group" role="group" aria-label="">
                {buttons}
            </div>
        </div>
    )
}

import React from 'react'
import { ChartTimeData } from '../common/Data';

export default function ChartTimeBar({ chartTimeInHour, onTimeChange }) {
    const buttons = ChartTimeData.map(item => {
        const color = item.value === chartTimeInHour ? 'btn-primary' : 'btn-light';
        return <button key={item.value} onClick={onTimeChange.bind(this, item.value)} type="button" className={`btn ${color}`}>{item.text}</button>
    })
    return (
        <div>
            <div className="btn-group" role="group" aria-label="">
                {buttons}
            </div>
        </div>
    )
}

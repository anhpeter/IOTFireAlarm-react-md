import React from 'react'

export default function DummyRealtimeStatusToggler({ hasDummyRealtimeStatus, setDummyRealtimeStatus }) {
    const btnColorClass = hasDummyRealtimeStatus ? 'btn-dark' : 'btn-light';
    const btnText = hasDummyRealtimeStatus ? 'Dummy realtime On' : 'Dummy realtime Off';
    return (
        <button onClick={setDummyRealtimeStatus.bind(this, !hasDummyRealtimeStatus)} className={`btn ${btnColorClass}`}>{btnText}</button>
    )
}

import React from 'react'

export default function Alert({ children, color = 'primary' }) {
    return (
        <div className={`alert alert-${color} text-center`} role="alert">{children}</div>
    )
}

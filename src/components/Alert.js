import React from 'react'

export default function Alert({ children, color = 'primary' }) {
    return (
        <div class={`alert alert-${color} text-center`} role="alert">{children}</div>
    )
}

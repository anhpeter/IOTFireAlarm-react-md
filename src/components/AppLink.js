import React from 'react'
import { Link } from 'react-router-dom'

export default function AppLink({ children, to }) {
    return (
        <Link className="link-no-style" to={to}>
            {children}
        </Link>
    )
}

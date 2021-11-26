import React from 'react'
import { Link } from 'react-router-dom'
import AppLink from './AppLink'

export default function Header() {
    return (
        <div className="header">
            <div className="container">
                <AppLink to="/">
                    <h2>Hotel Management</h2>
                </AppLink>
            </div>
        </div>
    )
}

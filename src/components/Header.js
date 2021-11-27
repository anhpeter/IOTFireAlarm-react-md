import React from 'react'
import { Link } from 'react-router-dom'
import AppLink from './AppLink'

export default function Header() {
    return (
        <div className="header">
            <div className="container">
                <h2>
                    <AppLink to="/">
                        Hotel Management
                    </AppLink>
                </h2>
            </div>
        </div>
    )
}

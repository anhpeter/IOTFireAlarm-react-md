import React from 'react'
import { Link } from 'react-router-dom';

export default function RoomExcerpt({ id, imageUrl, name }) {
    return (
        <div>
            <Link to={'/room/' + id}>
                <img className="img-thumbnail" src={imageUrl} alt="" />
            </Link>
            <h5>{name}</h5>
        </div>
    )
}

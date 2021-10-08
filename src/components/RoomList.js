import React, { useState } from 'react'
import { useEffect } from 'react';
import RoomApi from '../apis/RoomApi';
import RoomExcerpt from './RoomExcerpt'


export default function RoomList() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const items = await RoomApi.fetchItems();
            console.warn('rooms', items);
            setRooms(items);
        }
        fetchItems();
    }, [setRooms]);

    const roomsHtml = rooms.map(item => {
        return (
            <div className="col-md-4 vitri">
                <RoomExcerpt key={item.id} id={item._id} imageUrl={item.imageUrl} name={item.name} />
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row">
                {roomsHtml}
            </div>
        </div>
    )
}

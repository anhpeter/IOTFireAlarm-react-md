import React, { useState } from 'react'
import { useEffect } from 'react';
import RoomApi from '../apis/RoomApi';
import RoomExcerpt from './RoomExcerpt'


export default function RoomList() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const items = await RoomApi.fetchItems();
                setRooms(items);
            }catch(e){}
        }
        fetchItems();
    }, [setRooms]);

    const roomsHtml = rooms.map(item => {
        return (
            <div key={item._id} className="col-md-4 vitri mb-4">
                <RoomExcerpt id={item._id} imageUrl={item.imageUrl} name={item.name} />
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

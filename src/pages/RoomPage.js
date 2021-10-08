import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import RoomApi from '../apis/RoomApi';
import MyChart from '../components/MyChart'

export default function RoomPage() {
    const [item, setItem] = useState(undefined);
    let { id } = useParams();
    useEffect(() => {
        const fetchItem = async () => {
            const r = await RoomApi.fetchItemById(id)
            setItem(r);
        }
        fetchItem();
    }, [id, setItem]);
    console.warn('ROOM', item);
    return (
        <div className="main">
            <div className="container">
                <div className="row">
                    {
                        !!item
                            ? (
                                <div className="col-12">
                                    <h3>{item.name}</h3>
                                    <div>
                                        <img className="img-fluid" src={item.imageUrl} alt="" />
                                    </div>
                                    {/* CHART */}
                                    <div>
                                        <MyChart />
                                    </div>
                                </div>
                            )
                            : <p>Loading ...</p>
                    }
                </div>
            </div>
        </div>
    )
}

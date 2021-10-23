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
        // socket.on('test-data', () => {
        //     alert('abc')
        // })
        const fetchItem = async () => {
            const r = await RoomApi.fetchItemById(id)
            setItem(r);
        }
        fetchItem();
    }, [id, setItem]);
    const loading = <p>Loading ...</p>
    return (
        <div className="main">
            {
                !!item
                    ? <div className="container">
                        <div className="row mb-4">
                            <div className="col-12">
                                <h3>{item.name}</h3>
                                <div>
                                    <img className="img-fluid" src={item.imageUrl} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="card">
                                    <div className="card-header">Realtime </div>
                                    <div className="card-body">
                                        <MyChart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : loading
            }
        </div>
    )
}

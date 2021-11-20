import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import RoomApi from '../apis/RoomApi';
import Clock from '../components/Clock';
import RealtimeChart from '../components/RealtimeChart';

const TitleWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
`;
const Image = styled.img`
    aspect-ratio:3/2;
    border-radius:10px;
    max-width:100%;
`

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
    const loading = <p>Loading ...</p>
    return (
        <>
            <div className="container">
                {
                    !!item
                        ?
                        <>
                            <div className="row mb-4">
                                <div className="col-12">
                                    <TitleWrapper>
                                        <h1>{item.name}</h1>
                                        <Clock />
                                    </TitleWrapper>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3" >
                                    <Image src={item.imageUrl} alt="" />
                                </div>
                                <div className="col-lg-9">
                                    <RealtimeChart item={item} />
                                </div>
                            </div>
                        </>
                        : null
                }
            </div>
        </>

    )
}

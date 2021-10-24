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
    position:absolute;
    top:0;
    bottom:0;
    max-height:100%;
    max-width:100%;
    aspect-ratio:3/2;
    border-radius:10px;
    @media (max-width: 992px) {
        position:unset;
    }
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
                                <div className="col-lg-6 position-relative">
                                    <Image src={item.imageUrl} alt="" />
                                </div>
                                <div className="col-lg-6">
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

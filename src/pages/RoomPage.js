import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import RoomApi from '../apis/RoomApi';
import ChartTimeBar from '../components/ChartTimeBar';
import Clock from '../components/Clock';
import DummyRealtimeStatusToggler from '../components/DummyRealtimeStatusToggler';
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
     box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`
const ToolBar = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom: .5rem;
    @media (max-width: 576px){ 
        max-width: 800px;
        flex-direction:column-reverse;
        align-items:center;
        >*{
            margin-bottom:.5rem;
        }
    }
`

export default function RoomPage() {
    let { id } = useParams();
    const [item, setItem] = useState(undefined);
    const [hasDummyRealtimeStatus, setDummyRealtimeStatus] = useState(false);
    const [chartTimeInHour, setChartTimeInHour] = useState(1);
    useEffect(() => {
        const fetchItem = async () => {
            const r = await RoomApi.fetchItemById(id)
            setItem(r);
        }
        fetchItem();
    }, [id, setItem]);
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
                                <div className="offset-lg-4 col-lg-4 mb-3" >
                                    <Image src={item.imageUrl} alt="" />
                                </div>
                                <div className="col-12">
                                    <ToolBar>
                                        <ChartTimeBar chartTimeInHour={chartTimeInHour} onTimeChange={setChartTimeInHour} />
                                        {
                                            chartTimeInHour < 24
                                                ? <DummyRealtimeStatusToggler setDummyRealtimeStatus={setDummyRealtimeStatus} hasDummyRealtimeStatus={hasDummyRealtimeStatus} />
                                                : null
                                        }
                                    </ToolBar>
                                    <RealtimeChart chartTimeInHour={chartTimeInHour} item={item} hasDummyRealtimeStatus={hasDummyRealtimeStatus} />
                                </div>
                            </div>
                        </>
                        : null
                }
            </div>
        </>
    )
}

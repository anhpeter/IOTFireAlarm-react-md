import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import useSocket from 'use-socket.io-client';
import StatusApi from '../apis/StatusApi';
import { API_DOMAIN } from '../app_constant';
import { ChartTimeData } from '../common/Data';
import ChartHelper from '../helper/ChartHeper';
import Alert from './Alert';
import StatusChart from './StatusChart';

const ChartContainer = styled.div`
    height:400px;
`;


export default function RealtimeChart({ item: room, chartTimeInHour, hasDummyRealtimeStatus }) {
    const [socket] = useSocket(API_DOMAIN);

    const { flameData: defaultFlames, gasData: defaultGases, labels: defaultLabels } = ChartHelper.genDefaultData(chartTimeInHour);
    const [gasData, setGasData] = useState(defaultGases);
    const [flameData, setFlameData] = useState(defaultFlames);
    const [labels, setLabels] = useState(defaultLabels);
    const [isLoading, setLoading] = useState(false);

    // SOCKET
    useEffect(() => {
        socket.off(`SERVER_EMIT_ROOM_WITH_STATUS_${room._id}`);
        socket.off(`SERVER_EMIT_DUMMY_STATUS_${room._id}`);

        // LISTEN STATUS
        socket.on(`SERVER_EMIT_ROOM_WITH_STATUS_${room._id}`, (data) => {
            if (chartTimeInHour < 24) {
                setGasData(items => {
                    const status = ChartHelper.getStatus(data, ['gas']);
                    return items.length === 0 ? [status] : [...items.slice(1), status];
                })
                setFlameData(items => {
                    const status = ChartHelper.getStatus(data, ['flame']);
                    return items.length === 0 ? [status] : [...items.slice(1), status];
                })
                setLabels(items => {
                    const lbl = ChartHelper.getLabel(data, chartTimeInHour);
                    return items.length === 0 ? [lbl] : [...items.slice(1), lbl];
                })

            }
        });

        // LIST DUMMY STATUS
        // if (hasDummyRealtimeStatus) {
        //     socket.on(`SERVER_EMIT_DUMMY_STATUS_${room._id}`, (data) => {
        //         if (chartTimeInHour < 24) {
        //             setGasData(items => {
        //                 const status = ChartHelper.getStatus(data, ['gas']);
        //                 return items.length === 0 ? [status] : [...items.slice(1), status];
        //             })
        //             setFlameData(items => {
        //                 const status = ChartHelper.getStatus(data, ['flame']);
        //                 return items.length === 0 ? [status] : [...items.slice(1), status];
        //             })
        //             setLabels(items => {
        //                 const lbl = ChartHelper.getLabel(data, chartTimeInHour);
        //                 return items.length === 0 ? [lbl] : [...items.slice(1), lbl];
        //             })

        //         }
        //     });
        // }
    }, [room._id, chartTimeInHour, hasDummyRealtimeStatus, socket])

    // FETCHES
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {

                // fetch
                let items = await StatusApi.fetchLastItemsAfterTimeByRoomId(room._id, ChartHelper.getFetchTime(chartTimeInHour))
                items = items.reverse();
                const chartHelper = new ChartHelper(chartTimeInHour, items);

                // gen data
                const { gasData, flameData, labels } = chartHelper.genData(items);
                setGasData(gasData);
                setFlameData(flameData);
                setLabels(labels);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        }
        fetch();
    }, [room._id, chartTimeInHour, setGasData, setLabels, setFlameData])

    const ChartTimeItem = ChartTimeData.find(item => item.value === chartTimeInHour);
    const chartTitle = chartTimeInHour < 24 ? `Realtime In Last ${ChartTimeItem.text}` : `Last ${ChartTimeItem.text}`

    return (
        <div className="card border-0">
            <ChartContainer className="card-body" >
                {
                    !isLoading
                        ? <StatusChart title={chartTitle} gasData={gasData} flameData={flameData} labels={labels} />
                        : <Alert color="info">Loading ...</Alert>
                }
            </ChartContainer>
        </div>
    )
}

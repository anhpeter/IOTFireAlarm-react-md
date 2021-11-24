import React, { useEffect } from 'react'
import { useState } from 'react';
import useSocket from 'use-socket.io-client';
import StatusApi from '../apis/StatusApi';
import { API_DOMAIN } from '../app_constant';
import ChartHelper from '../helper/ChartHeper';
import StatusChart from './StatusChart';



export default function RealtimeChart({ item: room, chartTimeInHour }) {
    const [socket] = useSocket(API_DOMAIN);

    const { flameData: defaultFlames, gasData: defaultGases, labels: defaultLabels } = ChartHelper.genDefaultData(chartTimeInHour);
    const [gasData, setGasData] = useState(defaultGases);
    const [flameData, setFlameData] = useState(defaultFlames);
    const [labels, setLabels] = useState(defaultLabels);

    // SOCKET
    useEffect(() => {
        socket.off(`SERVER_EMIT_ROOM_WITH_STATUS_${room._id}`);
        socket.on(`SERVER_EMIT_ROOM_WITH_STATUS_${room._id}`, (data) => {
            console.log('socket')
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
        });
    }, [room._id, chartTimeInHour, socket])

    // FETCHES
    useEffect(() => {
        const fetch = async () => {
            try {
                const chartHelper = new ChartHelper(chartTimeInHour);

                // fetch
                let items = await StatusApi.fetchLastItemsAfterTimeByRoomId(room._id, ChartHelper.getFetchTime(chartTimeInHour))
                items = items.reverse();

                // gen data
                const { gasData, flameData, labels } = chartHelper.genData(items);
                setGasData(gasData);
                setFlameData(flameData);
                setLabels(labels);
            } catch (e) {
                console.error(e)
            }
        }
        fetch();
    }, [room._id, chartTimeInHour, setGasData, setLabels, setFlameData])

    return (
        <div className="card">
            <div className="card-body">
                <StatusChart gasData={gasData} flameData={flameData} labels={labels} />
            </div>
        </div>
    )
}

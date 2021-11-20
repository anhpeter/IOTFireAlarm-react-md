import React, { useEffect } from 'react'
import { useState } from 'react';
import useSocket from 'use-socket.io-client';
import StatusApi from '../apis/StatusApi';
import { API_DOMAIN } from '../app_constant';
import Helper from '../helper/Helper';
import StatusChart from './StatusChart';

const getStatus = (item, field) => {
    return item[field] === 0 ? 1 : 0;
}

const getLabel = (item) => {
    const d = new Date(item.date);
    const h = Helper.strPad(d.getHours(), 2, '0');
    const m = Helper.strPad(d.getMinutes(), 2, '0');
    const t = `${h}:${m}`;
    return t;
}

export default function RealtimeChart({ item: room }) {
    const [socket] = useSocket(API_DOMAIN);
    const defaultData = [];
    const [gasData, setGasData] = useState(defaultData);
    const [flameData, setFlameData] = useState(defaultData);
    const [labels, setLabels] = useState(defaultData);

    // SOCKET
    useEffect(() => {
        socket.on(`SERVER_EMIT_ROOM_WITH_STATUS_${room._id}`, (data) => {
            console.log(data);
            setGasData(items => {
                const status = getStatus(data, ['gas']);
                return items.length === 0 ? [status] : [...items.slice(1), status];
            })
            setFlameData(items => {
                const status = getStatus(data, ['flame']);
                return items.length === 0 ? [status] : [...items.slice(1), status];
            })
            setLabels(items => {
                const lbl = getLabel(data);
                return items.length === 0 ? [lbl] : [...items.slice(1), lbl];
            })
        });
    }, [room._id, socket])

    // FETCHES
    useEffect(() => {
        const fetch = async () => {
            try {
                let items = await StatusApi.fetchLastItemsByRoomId(room._id, 60)
                items = items.reverse();
                console.log(items);

                const gasData = items.map(item => {
                    return getStatus(item, 'gas');
                })
                setGasData(gasData);

                const flameData = items.map(item => {
                    return getStatus(item, 'flame');
                })
                setFlameData(flameData);

                const labels = items.map(item => getLabel(item));
                setLabels(labels);

            } catch (e) { 
            }
        }
        fetch();
    }, [room._id, setGasData, setLabels, setFlameData])

    return (
        <div className="card">
            <div className="card-body">
                <StatusChart gasData={gasData} flameData={flameData} labels={labels} />
            </div>
        </div>
    )
}

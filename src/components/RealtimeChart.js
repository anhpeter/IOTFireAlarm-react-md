import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components';
import StatusApi from '../apis/StatusApi';
import { API_DOMAIN } from '../constants/app_constant';
import { ChartTimeData } from '../common/Data';
import ChartHelper from '../helper/ChartHeper';
import StatusChart from './StatusChart';
import Loading from './Loading';
import { socket } from '../common/Socket';

const ChartContainer = styled.div`
    min-height:300px;
    flex-direction:column;
    display:flex;
    justify-content:center;
`;

export default function RealtimeChart({ item: room, chartTimeInHour, hasDummyRealtimeStatus }) {
    const [isLoading, setLoading] = useState(false);

    // data
    const { flameData: defaultFlames, gasData: defaultGases, labels: defaultLabels } = ChartHelper.genDefaultData(chartTimeInHour);
    const [gasData, setGasData] = useState(defaultGases);
    const [flameData, setFlameData] = useState(defaultFlames);
    const [labels, setLabels] = useState(defaultLabels);

    // const [realtimeLabels, setRealtimeLabels] = useState(defaultLabels);
    // const [realtimeFlames, setRealtimeFlames] = useState(defaultFlames);
    // const [realtimeGases, setRealtimeGases] = useState(defaultGases);

    // SOCKET
    useEffect(() => {
        // LISTEN STATUS
        socket.on(`SERVER_EMIT_ROOM_WITH_STATUS_${room._id}`, (data) => {
            if (chartTimeInHour === -1) {
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
        return () => {
            socket.off(`SERVER_EMIT_ROOM_WITH_STATUS_${room._id}`);
        }
    }, [room._id, chartTimeInHour, hasDummyRealtimeStatus])

    // FETCHES
    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {

                // fetch
                let items;
                if (chartTimeInHour === -1) {
                    items = await StatusApi.fetchLastItems(room._id, 30)
                } else {
                    items = await StatusApi.fetchLastItemsAfterTimeByRoomId(room._id, ChartHelper.getFetchTime(chartTimeInHour))
                }

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
    const chartTitle = chartTimeInHour === -1 ? `Realtime status` : `Last ${ChartTimeItem.text}`

    let gasDs, flameDs, labelDs;
    // if (chartTimeInHour === -1) {
    // gasDs = realtimeGases;
    // flameDs = realtimeFlames;
    // labelDs = realtimeLabels;
    // } else {
    gasDs = gasData;
    flameDs = flameData;
    labelDs = labels;
    // }
    return (
        <div className="card border-0">
            <ChartContainer className="card-body" >
                {
                    !isLoading
                        ? <StatusChart title={chartTitle} gasData={gasDs} flameData={flameDs} labels={labelDs} />
                        : <Loading />
                }
            </ChartContainer>
        </div>
    )
}

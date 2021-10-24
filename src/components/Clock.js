import React, { useEffect } from 'react'
import { useState } from 'react';
import styled from 'styled-components'
import Helper from '../helper/Helper';

const Content = styled.span`
    font-size:1.5rem;
`;

export default function Clock(timeStr) {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        setInterval(() => {
            setDate(new Date());
        }, 1000);
    }, [setDate])

    const h = Helper.strPad(date.getHours(), 2, '0');
    const m = Helper.strPad(date.getMinutes(), 2, '0');
    const s = Helper.strPad(date.getSeconds(), 2, '0');
    return (
        <Content>{h}:{m}:{s}"</Content>
    )
}

import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { socket } from '../common/Socket';
import { API_DOMAIN } from '../constants/app_constant';
import AppLink from './AppLink';


const Image = styled.img`
    width: 100%;
    object-fit:cover;
    aspect-ratio:3/2;
`;

const Wrapper = styled.div`
    position: relative;
    border-radius:10px;
    overflow:hidden;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
`;

const Warning = styled.div`
    position: absolute;
    top:0;
    bottom:0;
    right:0;
    left:0;
    text-transform: uppercase;
    display:flex;
    align-items:center;
    justify-content:center;
    color: white;
    font-size: 22px;
    background-color: rgba(247,15,15,.7);
    z-index:1;
    font-weight: bold;
`

export default function RoomExcerpt({ id, imageUrl, name }) {
    const [isWarning, setWarning] = useState(false);

    useEffect(() => {
        socket.on(`SERVER_EMIT_ROOM_WITH_STATUS_${id}`, (data) => {
            if (data.gas === 0 || data.flame === 0) {
                setWarning(true);
            } else {
                setWarning(false);
            }
        });
    }, [id, setWarning]);

    return (
        <div>
            <AppLink to={'/room/' + id}>
                <Wrapper>
                    <Image src={imageUrl} alt="" />
                    {
                        isWarning ? <Warning>{name}</Warning> : null
                    }
                    {
                        isWarning ? null : <h5 className="text-center py-2">{name}</h5>
                    }
                </Wrapper>
            </AppLink>
        </div>
    )
}

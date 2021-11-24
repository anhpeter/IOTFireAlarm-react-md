import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useSocket from 'use-socket.io-client';
import { API_DOMAIN } from '../app_constant';


const Image = styled.img`
    width: 100%;
    object-fit:cover;
    aspect-ratio:3/2;
`;

const Wrapper = styled.div`
    position: relative;
    border-radius:10px;
    overflow:hidden;
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
`;


export default function RoomExcerpt({ id, imageUrl, name }) {
    const [socket] = useSocket(API_DOMAIN);
    const [isWarning, setWarning] = useState(false);

    useEffect(() => {
        socket.on(`SERVER_EMIT_ROOM_WITH_STATUS_${id}`, (data) => {
            if (data.gas === 0 || data.flame === 0) {
                setWarning(true);
            } else {
                setWarning(false);
            }
        });
    }, [id, socket, setWarning]);


    return (
        <div>
            <Link to={'/room/' + id}>
                <Wrapper>
                    <Image src={imageUrl} alt="" />
                    {
                        isWarning ? <Warning>{name}</Warning> : null
                    }
                </Wrapper>
            </Link>
            {
                isWarning ? null : <h5>{name}</h5>
            }
        </div>
    )
}

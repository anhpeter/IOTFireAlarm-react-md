import React from 'react'
import styled from 'styled-components';
import LoadingIcon from '../assets/gifs/loading.gif';

const Image = styled.img`
    height: 100px;
    object-fit: contain;
`

export default function Loading() {
    return (
        <Image src={LoadingIcon} alt="loading" />
    )
}

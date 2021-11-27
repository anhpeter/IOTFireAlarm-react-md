import React from 'react'
import { useEffect } from 'react'
import sound from '../assets/alarms/alarm1.mp3'

export default function AlarmSound() {
    useEffect(() => {
        const src = document.getElementById('audio').getAttribute('src');
        document.getElementById('audio').setAttribute('src', src+'?autoplay=1');
    })
    return (
        <iframe title="abc" src={sound} type="audio/mp3" allow="autoplay" id="audio" >

        </iframe>
    )
}

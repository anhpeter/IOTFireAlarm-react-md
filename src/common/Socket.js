import { io } from 'socket.io-client';
import { API_DOMAIN } from '../constants/app_constant';

export const socket = io(API_DOMAIN+'/socket.io/socket.io.js');
export let socketID = '';
socket.on('connect', () => {
    socketID = socket.id
    console.log(socketID)
})
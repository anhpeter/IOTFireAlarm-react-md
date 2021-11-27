import { API_DOMAIN } from "../constants/app_constant";

const StatusApi = {
    fetchLastItems: function (_id, qty) {
        return fetch(`${API_DOMAIN}/room-status/get-last-items/${_id}?qty=${qty}`)
            .then(response => response.json())
            .then(data => data.payload);
    },
    fetchLastItemsAfterTimeByRoomId: function (_id, timeStr) {
        return fetch(`${API_DOMAIN}/room-status/get-last-items-after-time/${_id}?time=${timeStr}`)
            .then(response => response.json())
            .then(data => data.payload);
    }
}
export default StatusApi;
import { API_DOMAIN } from "../app_constant";

const RoomApi = {
    fetchItems: async function () {
        return fetch(`${API_DOMAIN}/room`)
            .then(response => response.json())
            .then(data => data.payload);
    },

    fetchItemById: async function (_id) {
        return fetch(`${API_DOMAIN}/room/get-by-id/${_id}`)
            .then(response => response.json())
            .then(data => data.payload);
    }
}

export default RoomApi;
import axios from "axios";

const API_URL = "http://localhost:3001";

export async function get(url) {
    return await (await axios.get(`${API_URL}/${url}`)).data.result;
}

export async function remove(url) {
    return await (await axios.remove(`${API_URL}/${url}`)).data.result;
}

export async function post(url, data) {
    return await (await axios.post(`${API_URL}/${url}`, data)).data.result;
}

export async function patch(url, data) {
    return await (await axios.patch(`${API_URL}/${url}`, data)).data.result;
}
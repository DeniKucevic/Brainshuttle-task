import axios from 'axios';

const BASE_URL = 'http://178.128.206.150:7000/'

const API_KEY = 'fc097eff-bfab-4ea1-be55-6d649d7cce5d'


const player = async (name) => {
    return await axios.post(
        `${BASE_URL}player`, { name: name, apikey: API_KEY }
    )
}

const createBoard = async () => {
    return await axios.post(
        `${BASE_URL}create_board`, { apikey: API_KEY }
    )
}

const getBoards = async () => {
    return await axios.post(
        `${BASE_URL}boards`, { apikey: API_KEY }
    )
}

export { player, createBoard, getBoards };
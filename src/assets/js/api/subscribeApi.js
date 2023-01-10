import axios from 'axios';

export const sendSubscribeRequest = (data) => {
    return axios.post('/api/subscribe', data);
};

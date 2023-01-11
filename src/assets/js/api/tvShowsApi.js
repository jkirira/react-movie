import axios from 'axios';

export const fetchTvShows = () => {
    return axios.get('/api/tv-shows');
};

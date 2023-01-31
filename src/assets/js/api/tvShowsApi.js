import axios from 'axios';

export const fetchTvShows = (pageNumber) => {
    if(!!pageNumber) {
        return axios.get(`/api/tv-shows?page=${pageNumber}`);
    }

    return axios.get('/api/tv-shows');
};

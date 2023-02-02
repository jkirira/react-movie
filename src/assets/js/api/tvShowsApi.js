import axios from 'axios';

export const fetchTvShows = (pageNumber) => {
    if(!!pageNumber) {
        return axios.get(`/api/tv-shows?page=${pageNumber}`);
    }

    return axios.get('/api/tv-shows');
};

export const fetchTvShowDetails = (id) => {
    return axios.get(`/api/tv-shows/${id}`);
};

export const fetchSeasonDetails = (tv_show_id, season_number) => {
    return axios.get(`/api/tv-shows/${tv_show_id}/season/${season_number}`);
};

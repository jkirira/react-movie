import axios from 'axios';

export const fetchTvShows = (options) => {
    return axios.get('/api/tv-shows', options);
};

export const fetchTvShowDetails = (id) => {
    return axios.get(`/api/tv-shows/${id}`);
};

export const fetchSeasonDetails = (tv_show_id, season_number) => {
    return axios.get(`/api/tv-shows/${tv_show_id}/season/${season_number}`);
};

import axios from 'axios';

export const fetchMovies = (queryParams) => {
    return axios.get('/api/movies', {params: queryParams});
};

export const fetchMovieDetails = (id) => {
    return axios.get(`/api/movies/${id}`);
};

import axios from 'axios';

export const fetchMovies = (options) => {
    return axios.get('/api/movies', options);
};

export const fetchMovieDetails = (id) => {
    return axios.get(`/api/movies/${id}`);
};

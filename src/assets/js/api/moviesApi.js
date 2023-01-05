import axios from 'axios';

export const fetchMovies = () => {
    return axios.get('/api/movies');
};

export const fetchMovieDetails = (id) => {
    return axios.get(`/api/movies/${id}`);
};

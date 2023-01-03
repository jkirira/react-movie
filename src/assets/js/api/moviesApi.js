import axios from 'axios';

export const fetchMovies = () => {
    return axios.get('/api/movies');
};

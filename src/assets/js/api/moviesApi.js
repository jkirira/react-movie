import axios from 'axios';

export const fetchMovies = (pageNumber) => {

    if(!!pageNumber) {
        console.log('page number', pageNumber);
        return axios.get(`/api/movies?page=${pageNumber}`);
    }

    return axios.get('/api/movies');
};

export const fetchMovieDetails = (id) => {
    return axios.get(`/api/movies/${id}`);
};

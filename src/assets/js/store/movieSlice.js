import { createSlice } from '@reduxjs/toolkit'

const MovieSlice = createSlice({
    name: "movies",
    initialState: [],
    reducers: {
        SET_MOVIES(state, action) {
            console.log(action, Date.now().toLocaleString())
            return state.concat(action.payload);
        }
    }
});

export const selectAllMovies = state => state.movies;

export const selectMovieById = (state, movieId) => state.movies.find(movie => movie.id === movieId);


export const { SET_MOVIES } = MovieSlice.actions;

export default MovieSlice.reducer;

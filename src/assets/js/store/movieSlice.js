import { createSlice } from '@reduxjs/toolkit'

const MovieSlice = createSlice({
    name: "movies",
    initialState: {},
    reducers: {
        SET_MOVIES(state, action) {
            return { ...state, ...action.payload };
        }
    }
});

export const selectMoviesByType = (state, type) => state.movies[type];

export const { SET_MOVIES } = MovieSlice.actions;

export default MovieSlice.reducer;

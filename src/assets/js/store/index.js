import { configureStore } from "@reduxjs/toolkit";
import MoviesReducer from "./movieSlice.js";

export default configureStore({
    reducer: {
        movies: MoviesReducer,
    }
})

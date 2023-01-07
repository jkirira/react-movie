import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MovieCard from "./MovieCard";
import * as MoviesApi from "../../api/moviesApi";
import { selectAllMovies, SET_MOVIES } from "../../store/movieSlice";

export default function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(selectAllMovies);

    useEffect(() => {
        if (!movies.length) {

            let ignore = false;
        
            MoviesApi.fetchMovies()
                    .then(response => {
                        if (!ignore) {
                            dispatch(SET_MOVIES(response.data.results));
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })


            return () => {
                ignore = true;
            }

        }
                
    }, []);
            

    return (
        <div className="movie-cards-container">
            { 
                movies.length 
                    ? movies.map(m => <MovieCard key={m.id} movie={m} />)
                    : <div>Loading Movies...</div>
            }
        </div>
    )

}

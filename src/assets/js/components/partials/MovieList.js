import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import MovieCard from "./MovieCard";
import { fetchMovies } from "../../api/moviesApi";
import { selectMoviesByType, SET_MOVIES } from "../../store/movieSlice";

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(state => selectMoviesByType(state, 'movies'));

    useEffect(() => {
        if (!movies || !movies.length) {

            let ignore = false;
        
            fetchMovies()
                    .then(response => {
                        if (!ignore) {
                            dispatch(SET_MOVIES({'movies': response.data.results}));
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
        <>
            <h2>Movies</h2>

            <div className="movie-cards-container">
                { 
                    movies?.length 
                        ? movies.map(m => <MovieCard key={m.id} movie={m} />)
                        : <div>Loading Movies...</div>
                }
            </div>
        </>
    )

}

export default React.memo(MovieList);

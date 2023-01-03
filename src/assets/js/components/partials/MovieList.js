import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import * as MoviesApi from "../../api/moviesApi";

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        let ignore = false;
    
        MoviesApi.fetchMovies()
                .then(response => {
                    if (!ignore) {
                        setMovies(response.data.results);
                    }
                })
                .catch(error => {
                    console.error(error.response.data);
                })


                return () => {
                    ignore = true;
                }
                
            }, []);
            

    return (
        <div className="movie-cards-container">
            { 
                movies.length && movies.map(m => <MovieCard key={m.id} movie={m} />)
            }
        </div>
    )

}

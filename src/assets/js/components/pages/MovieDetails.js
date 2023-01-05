import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import { fetchMovieDetails } from "../../api/moviesApi";

export default function MovieDetails() {
    const [movieDetails, setMovieDetails] = useState({});
    const { movie_id } = useParams();

    useEffect(() => {
        let ignore = false;

        fetchMovieDetails(movie_id)
            .then(response => {
                if (!ignore) {

                    if (!response.data) {
                        throw new Error("Something went wrong. Could not fetch movie details.");
                    }

                    setMovieDetails(response.data);
                }
            })
            .catch(error => {
                console.error(error.response.data);
            })


            return () => {
                ignore = true;
            };

    }, [])

    return (
        <>
            <div className="movie-splash">
                <img className="splash-image" src={`/images/${ movieDetails.backdrop_path && movieDetails.backdrop_path.split('/').pop() }`} />
            </div>

            <div className="movie-details">
                <section className="movie-genres">
                    <p><strong>Genres: </strong></p>
                    { movieDetails.genres && movieDetails.genres.map(genre => <span className="genre-tag" key={genre.id}>{genre.name}</span>) }
                </section>

                <section className="movie-title">
                    <h2>{ movieDetails.title }</h2>
                    <h5>{ movieDetails.tagline }</h5>
                </section>
                
                <section className="movie-overview">
                    <p>{ movieDetails.overview }</p>
                </section>

                <p><strong>Release Date: </strong>{ movieDetails.release_date && format(new Date(movieDetails.release_date), 'eeee do MMMM yyyy') }</p>

                <br />
                { movieDetails.homepage && <a href={movieDetails.homepage} target="_blank">Go to website</a> }

            </div>

        </>
    );
}

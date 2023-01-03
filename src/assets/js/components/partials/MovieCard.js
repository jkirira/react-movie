import React from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns'

export default function MovieCard({movie}) {

    return (
        <div 
            className="movie-card"
            style={{
                backgroundImage: `url(/images/${ movie.poster_path.split('/').pop() }?width=400)`
            }}>

            <div className="movie-description">
                <section className="title">
                    <h3>{ movie.title }</h3>
                </section>
                <section className="overview">
                    <p>{ movie.overview }</p>
                </section>
                <section className="meta-data">
                    <p><strong>Release Date:</strong></p>
                    <p> { format(new Date(movie.release_date), 'eeee do MMMM yyyy') }</p>
                </section>
            </div>
        </div>
    )
}

MovieCard.propTypes = {
    movie: PropTypes.object.isRequired,
}

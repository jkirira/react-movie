import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export default function TvShowCard({tv_show}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/tv-shows/${tv_show.id}`);
    }

    return (
        <div 
            className="movie-card"
            style={{
                backgroundImage: `url(/images/${ tv_show.poster_path.split('/').pop() }?width=400)`
            }}
            onClick={handleClick}>

            <div className="movie-description">
                <section className="title">
                    <h3>{ tv_show.name }</h3>
                </section>
                <section className="overview">
                    <p>{ tv_show.overview }</p>
                </section>
                <section className="meta-data">
                    <p><strong>First Aired:</strong></p>
                    <p> { tv_show.first_air_date && format(new Date(tv_show.first_air_date), 'eeee do MMMM yyyy') }</p>
                </section>
            </div>

        </div>
    )
}

TvShowCard.propTypes = {
    tv_show: PropTypes.object.isRequired,
}

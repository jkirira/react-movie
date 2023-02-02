import React, { useEffect, useState } from "react";
import LoadingComponent from "../partials/LoadingComponent";
import TvSeasonsComponent from "../partials/TvSeasonsComponent";
import { useParams } from "react-router-dom";
import { getFormattedDate } from "../../helpers.js";

import { fetchTvShowDetails } from "../../api/tvShowsApi";

export default function TvShowDetails() {
    const [tvShowDetails, setTvShowDetails] = useState(null);
    const { tv_show_id } = useParams();

    useEffect(() => {
        let ignore = false;

        fetchTvShowDetails(tv_show_id)
            .then(response => {
                if (!ignore) {

                    if (!response.data) {
                        throw new Error("Something went wrong. Could not fetch show details.");
                    }

                    setTvShowDetails(response.data);
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

            tvShowDetails 
            
            ?   <>
                
                    <div className="movie-splash">
                        <img className="splash-image" src={`/images/${ tvShowDetails.backdrop_path && tvShowDetails.backdrop_path.split('/').pop() }`} />
                    </div>

                    <div className="movie-details">
                        <section className="movie-genres">
                            <p><strong>Genres: </strong></p>
                            { tvShowDetails.genres && tvShowDetails.genres.map(genre => <span className="genre-tag" key={genre.id}>{genre.name}</span>) }
                        </section>

                        <section className="movie-title">
                            <h2>{ tvShowDetails.name }</h2>
                            <h5>{ tvShowDetails.tagline }</h5>
                        </section>
                        
                        <section className="movie-overview">
                            <p>{ tvShowDetails.overview }</p>
                        </section>

                        <section>
                            <p><strong>Runtime (minutes): </strong>{ tvShowDetails.episode_run_time[0] }</p>
                        </section>

                        <section className="tv-show-episode-details">

                        {
                            !!tvShowDetails.last_episode_to_air

                            ?

                                <div>
                                    <p><strong>Last Episode To Air:</strong> Season { tvShowDetails.last_episode_to_air.season_number }, Episode { tvShowDetails.last_episode_to_air.episode_number }</p>
                                    
                                    <p><strong>Episode name:</strong> { tvShowDetails.last_episode_to_air.name }</p>

                                    <p><strong>Episode Date:</strong> { getFormattedDate(tvShowDetails.last_episode_to_air.air_date) }</p>

                                    { tvShowDetails.last_episode_to_air.overview && <p><strong>Overview:</strong>  { tvShowDetails.last_episode_to_air.overview } </p> }
                                </div>

                            :
                           
                                <p><strong>Last Episode Date: </strong>{ tvShowDetails.last_air_date && getFormattedDate(tvShowDetails.last_air_date) }</p>

                        }


                        {
                            !!tvShowDetails.next_episode_to_air

                            &&

                                <div>
                                    <p><strong>Next Episode To Air:</strong> Season { tvShowDetails.next_episode_to_air.season_number }, Episode { tvShowDetails.next_episode_to_air.episode_number }</p>
                                    
                                    <p><strong>Episode name:</strong> { tvShowDetails.next_episode_to_air.name }</p>

                                    <p><strong>Episode Date:</strong> { getFormattedDate(tvShowDetails.next_episode_to_air.air_date) }</p>

                                    { tvShowDetails.next_episode_to_air.overview && <p><strong>Overview:</strong>  { tvShowDetails.next_episode_to_air.overview } </p> }
                                </div>

                        }
                        
                        </section>

                        <section>
                            <TvSeasonsComponent tv_show_id={tvShowDetails.id} number_of_seasons={tvShowDetails.number_of_seasons} />
                        </section>

                        <br />

                        { tvShowDetails.homepage && <a href={tvShowDetails.homepage} target="_blank">Go to website</a> }

                    </div>
                
                </>

            :   <div>
                    <LoadingComponent>Fetching Show Details...</LoadingComponent>
                </div>
         
    );
}

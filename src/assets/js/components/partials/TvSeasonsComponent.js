import React, { useEffect, useState } from "react";
import LoadingComponent from "../partials/LoadingComponent";
import { getFormattedDate } from "../../helpers.js";

import { fetchSeasonDetails } from "../../api/tvShowsApi";


function TvSeasonsComponent({tv_show_id, number_of_seasons}) {

    const [selectedSeasonNumber, setSelectedSeasonNumber] = useState(1);
    const [seasonEpisodes, setSeasonEpisodes] = useState({});
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    useEffect(() => {
        console.log('Seasons Component rerendered')
    });

    useEffect(() => {
        let ignore = false;

        if ( !seasonEpisodes[selectedSeasonNumber] || !seasonEpisodes[selectedSeasonNumber].length ) {

            fetchSeasonDetails(tv_show_id, selectedSeasonNumber)
                .then(response => {
                    if (!ignore) {

                        setSeasonEpisodes(seasonEpisodes => { 
                            return { ...seasonEpisodes, [selectedSeasonNumber]: response.data['episodes'] }
                        })

                        setSelectedEpisode(null);

                    }
                })
                .catch(error => {
                    console.log('Could not fetch season details', error.response.data)
                })

        }


            return () => {
                ignore = true;
            }

    }, [selectedSeasonNumber])


    const handleEpisodeClick = (id) => {
        if(!!selectedEpisode && (selectedEpisode.id === id)) {
            setSelectedEpisode(null);
            return;
        }
        
        let new_selected_episode = seasonEpisodes[selectedSeasonNumber]?.find(episode => episode.id == id)
        console.log('id', id)

        setSelectedEpisode(new_selected_episode);

    }


    return (
        <div className="seasons">
            <div className="seasons-list">
                {
                    !!number_of_seasons
                    
                    &&

                    <>
                        <p><strong>Seasons: </strong></p>
                        {
                            [...Array(number_of_seasons).keys()].map(season => <span key={season} 
                                                                                    className={ "season-tag" + ((season + 1) == selectedSeasonNumber ? " active" : '') } 
                                                                                    onClick={() => setSelectedSeasonNumber(season + 1)}>
                                                                                        { season + 1 }
                                                                                </span>)
                        }
                    </>
                    

                }
            </div>

            <div className="season-episodes-list">
                {
                    !!seasonEpisodes[selectedSeasonNumber]

                    ?
                        <>
                            <section className="episodes-list">
                                <p style={{position: 'sticky', top: 0, backgroundColor: '#fff', border: '1px solid gray'}}><strong>Episodes: </strong></p>
                                <ul>
                                    {  
                                        seasonEpisodes[selectedSeasonNumber].length 
                                    
                                        ? seasonEpisodes[selectedSeasonNumber].map(episode => <li key={episode.id} className={ (selectedEpisode?.id === episode.id ? "active" : '') } >
                                                                                                <p className="episode-name" onClick={() => handleEpisodeClick(episode.id)}><strong>Episode {episode.episode_number}:</strong> {episode.name}</p>
                                                                                                <strong>Aired on:</strong> { getFormattedDate(episode.air_date) }
                                                                                            </li>)

                                        : <li>No Episodes Found.</li>

                                    }
                                </ul>
                            </section>

                            <section className="episode-details" data-show={!!selectedEpisode}>
                                <div className="movie-details">
                                    <section className="movie-title">
                                        <h2>Episode {selectedEpisode?.episode_number}: {selectedEpisode?.name}</h2>
                                        <h5>Season: { selectedEpisode?.season_number }</h5>
                                    </section>

                                    {
                                        selectedEpisode?.still_path

                                        &&
                                        
                                        <section className="still-path">
                                            <img src={`/images/${ selectedEpisode.still_path.split('/').pop() }`} />
                                        </section>
                                    }
                                    
                                    <section className="movie-overview">
                                        <p>{ selectedEpisode?.overview }</p>
                                        <p><strong>Runtime (minutes): </strong>{ selectedEpisode?.runtime }</p>
                                    </section>
                                </div>
                            </section>
                        </>
                    :
                        <LoadingComponent>Loading Season Information</LoadingComponent>
                }
            </div>
        </div>
    )
};

export default React.memo(TvSeasonsComponent);

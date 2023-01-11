import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import TvShowCard from "./TvShowCard";
import { fetchTvShows } from "../../api/tvShowsApi";
import { selectMoviesByType, SET_MOVIES } from "../../store/movieSlice";

function TvShowsList() {
    const dispatch = useDispatch();
    const tv_shows = useSelector(state => selectMoviesByType(state, 'tv_shows'));

    useEffect(() => {
        if (!tv_shows || !tv_shows.length) {

            let ignore = false;
        
            fetchTvShows()
                    .then(response => {
                        if (!ignore) {
                            dispatch(SET_MOVIES({'tv_shows': response.data.results}));
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
            <h2>Tv Shows</h2>

            <div className="movie-cards-container">
                { 
                    tv_shows?.length 
                        ? tv_shows.map(t => <TvShowCard key={t.id} tv_show={t} />)
                        : <div>Loading Tv Shows ...</div>
                }
            </div>
        </>
    )

}

export default React.memo(TvShowsList);

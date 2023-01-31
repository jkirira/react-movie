import React, { useState, useEffect } from "react";

import TvShowCard from "../partials/TvShowCard";
import PaginationComponent from "../partials/PaginationComponent";
import LoadingComponent from "../partials/LoadingComponent";
import { fetchTvShows } from "../../api/tvShowsApi";
import { useSearchParams } from "react-router-dom";


export default function TvShowsPage() {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();

    let currentPageNumber = searchParams.get('page');

    useEffect(() => {
        console.log('rerendering tvShows page ' + new Date().getTime());
        let ignore = false;

        setLoading(true);

        fetchTvShows(currentPageNumber)
                .then(response => {
                    if (!ignore) {
                        setTvShows(response.data.results);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
                .then(() => {
                    setLoading(false);
                })

        return () => {
            ignore = true;
            setLoading(false);
        }

    }, [currentPageNumber]);


    const handlePaginate = (index) => {
        searchParams.set("page", index);
        setSearchParams(searchParams);
    }


    return (
        <div className="movies_page">

            <h2>Explore Tv Shows</h2>

            {
                loading || !tvShows.length
                
                ?

                    <div>
                        <LoadingComponent>Loading Shows...</LoadingComponent>
                    </div>

                :

                <>

                    <div className="movies_page__movies">
                        {
                            tvShows.map(t => <TvShowCard key={t.id} tv_show={t} />)
                        }
                    </div>

                </>
                 
            }


            {
                tvShows.length

                &&

                <PaginationComponent
                    currentPage={currentPageNumber ? currentPageNumber : undefined}
                    min={1}
                    max={10}
                    handlePaginate={handlePaginate}
                />
            }


        </div>
        
    )
}

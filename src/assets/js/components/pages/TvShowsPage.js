import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import TvShowCard from "../partials/TvShowCard";
import PaginationComponent from "../partials/PaginationComponent";
import LoadingComponent from "../partials/LoadingComponent";
import SearchComponent from "../partials/SearchComponent";

import useDebounce from "../../hooks/useDebounce";
import { fetchTvShows } from "../../api/tvShowsApi";


export default function TvShowsPage() {
    const [tvShows, setTvShows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tvSearchQuery, setTvSearchQuery] = useState('');
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    let [searchParams, setSearchParams] = useSearchParams();

    const debouncedTvSearchQuery = useDebounce(tvSearchQuery);

    let currentPageNumber = searchParams.get('page');

    useEffect(() => {
        console.log('rerendering tvShows page ' + new Date().getTime());

        setLoading(true);

        let params = {};
        
        if(!!currentPageNumber) {
            params['page'] = currentPageNumber;
        }
        
        if(!!debouncedTvSearchQuery) {
            params['search'] = debouncedTvSearchQuery;
        }

        const controller = new AbortController();
        
        let options = { 
            signal: controller.signal,
            params: params
        }

        fetchTvShows(options)
                .then(response => {
                    setTvShows(response.data.results);
                    setTotalNumberOfPages(response.data.total_pages);
                })
                .catch(error => {
                    // console.error(error);
                })
                .then(() => {
                    if (!controller.signal.aborted) {
                        setLoading(false);
                    }
                })

        return () => {
            controller.abort();
        }

    }, [currentPageNumber, debouncedTvSearchQuery]);


    const handlePaginate = useCallback((index) => {
        searchParams.set("page", index);
        setSearchParams(searchParams);
    }, []);

    const handleSearchInput = useCallback((e) => {
        setTvSearchQuery(e.target.value);
    }, []);


    return (
        <div className="movies_page">

            <h2>Explore Tv Shows</h2>

            {

                ( !loading || !!tvSearchQuery )
                
                &&

                <div className="search-container">
                    <SearchComponent value={tvSearchQuery} placeholder="Search Tv Shows..." onChangeHandler={handleSearchInput} />
                </div>

            }


            {
                
                loading
                
                &&

                <div>
                    <LoadingComponent>Loading Shows...</LoadingComponent>
                </div>

            }


            {
                
                !loading 
                
                &&
                
                (
                    tvShows?.length

                    ?
                                
                        <>

                            <div className="movies_page__movies">
                                {
                                    tvShows.map(t => <TvShowCard key={t.id} tv_show={t} />)
                                }
                            </div>
                                                        
                            <PaginationComponent
                                currentPage={currentPageNumber ? currentPageNumber : undefined}
                                min={1}
                                max={totalNumberOfPages > 10 ? 10 : totalNumberOfPages}
                                handlePaginate={handlePaginate}
                            />

                        </>
                    
                    :
                        <div className="movies_page__movies">
                            <p>No Tv Shows found {tvShows.length}</p>
                        </div>

                )

            }


        </div>
        
    )
}

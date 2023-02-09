import React, { useState, useEffect, useDeferredValue, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCard from "../partials/MovieCard";
import PaginationComponent from "../partials/PaginationComponent";
import LoadingComponent from "../partials/LoadingComponent";
import SearchComponent from "../partials/SearchComponent";

import { fetchMovies } from "../../api/moviesApi";


export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movieSearchQuery, setMovieSearchQuery] = useState('');
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
    let [searchParams, setSearchParams] = useSearchParams();

    const deferredMovieSearchQuery = useDeferredValue(movieSearchQuery);
    
    let currentPageNumber = searchParams.get('page');

    useEffect(() => {
        console.log('rerendering movies page ' + new Date().toString());

        setLoading(true);

        let params = {};
        
        if(!!currentPageNumber) {
            params['page'] = currentPageNumber;
        }
        
        if(!!deferredMovieSearchQuery) {
            params['search'] = deferredMovieSearchQuery;
        }
        
        if(!!movieSearchQuery) {
            params['search'] = movieSearchQuery;
        }

        const controller = new AbortController();
        
        let options = { 
            signal: controller.signal,
            params: params
        }

        fetchMovies(options)
                .then(response => {
                    setMovies(response.data.results);
                    setTotalNumberOfPages(response.data.total_pages);
                })
                .catch(error => {
                    // if (error.name === 'AbortError') { // ignore loading }
                    console.error(error);
                })
                .then(() => {
                    
                    /*
                    * 
                    *   only remove loading if the request was not cancelled
                    *
                    */
                    if (!controller.signal.aborted) {
                        setLoading(false);
                    }

                })

        return () => {
            controller.abort();
        }

    }, [currentPageNumber, deferredMovieSearchQuery]);


    const handlePaginate = useCallback((index) => {
        searchParams.set("page", index);
        setSearchParams(searchParams);
    }, []);


    const handleSearchInput = useCallback((e) => {
        setMovieSearchQuery(e.target.value);
    }, []);


    return (
        <div className="movies_page">

            <h2>Explore Movies</h2>

            {

                ( !loading || !!movieSearchQuery )

                &&

                <div className="search-container">
                    <SearchComponent value={movieSearchQuery} placeholder="Search Movies..." onChangeHandler={handleSearchInput} />
                </div>

            }


            {

                loading
                
                &&
                
                <div>
                    <LoadingComponent>Loading Movies...</LoadingComponent>
                </div>

            }
                    
                    
            {
                            
                !loading 
                
                && 
                
                (
                    movies?.length

                    ?
                                
                        <>

                            <div className="movies_page__movies">
                                {
                                    movies.map(m => <MovieCard key={m.id} movie={m} />)
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
                            <p>No Movies found</p>
                        </div>

                )   

            }


        </div>
        
    )
}

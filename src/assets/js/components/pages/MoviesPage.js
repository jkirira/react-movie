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
        console.log('rerendering movies page ' + new Date().getTime());
        let ignore = false;

        setLoading(true);

        let params = {};
        
        if(!!currentPageNumber) {
            params['page'] = currentPageNumber;
        }
        
        if(!!deferredMovieSearchQuery) {
            params['search'] = deferredMovieSearchQuery;
        }

        fetchMovies(params)
                .then(response => {
                    if (!ignore) {
                        setMovies(response.data.results);
                        setTotalNumberOfPages(response.data.total_pages);
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

                ( !loading || (loading && !!movieSearchQuery) )

                &&

                <div className="search-container">
                    <SearchComponent value={movieSearchQuery} placeholder="Search Movies..." onChangeHandler={handleSearchInput} />
                </div>

            }


            {
                loading || !movies.length
                
                ?

                    <div>
                        <LoadingComponent>Loading Movies...</LoadingComponent>
                    </div>

                :

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

            }


        </div>
        
    )
}

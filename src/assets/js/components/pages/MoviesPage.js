import React, { useState, useEffect } from "react";

import MovieCard from "../partials/MovieCard";
import PaginationComponent from "../partials/PaginationComponent";
import LoadingComponent from "../partials/LoadingComponent";
import { fetchMovies } from "../../api/moviesApi";
import { useSearchParams } from "react-router-dom";


export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams();

    let currentPageNumber = searchParams.get('page');

    useEffect(() => {
        console.log('rerendering movies page ' + new Date().getTime());
        let ignore = false;

        setLoading(true);

        fetchMovies(currentPageNumber)
                .then(response => {
                    if (!ignore) {
                        setMovies(response.data.results);
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

            <h2>Explore Movies</h2>

            {
                loading || !movies.length
                
                ?

                    <div>
                        <LoadingComponent>Loading Movies...</LoadingComponent>
                    </div>

                :

                <>

                    <div className="movie-cards-container">
                        {
                            movies.map(m => <MovieCard key={m.id} movie={m} />)
                        }
                    </div>

                </>
                 
            }


            {
                movies.length

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

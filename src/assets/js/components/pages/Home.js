import React from "react";
import MovieList from "../partials/MovieList";
import TvShowsList from "../partials/TvShowsList";

export default function Home() {

    return (
        <>
            <section className="home-page-list">
                <MovieList />
            </section>
            <section className="home-page-list">
                <TvShowsList />
            </section>
        </>
    );
}

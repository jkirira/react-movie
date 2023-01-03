import React from "react";
import Header from "../partials/Header";
import MovieList from "../partials/MovieList";

export default function Home() {

    return (
        <>
            <Header />
            <div className="content">
                <MovieList />
            </div>
        </>
    );
}

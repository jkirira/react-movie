import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import HomeLayout from "./assets/js/components/layouts/HomeLayout";

import Home from "./assets/js/components/pages/Home";
import ErrorPage from "./assets/js/components/pages/ErrorPage";
import MovieDetails from "./assets/js/components/pages/MovieDetails";
import MoviesPage from "./assets/js/components/pages/MoviesPage";
import TvShowsPage from "./assets/js/components/pages/TvShowsPage";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<HomeLayout />}>
			<Route errorElement={<ErrorPage />}>
				<Route index element={<Home />} />
				<Route path="movies" element={<MoviesPage />} />
				<Route path="movies/:movie_id" element={<MovieDetails />} />
				<Route path="tv-shows" element={<TvShowsPage />} />
			</Route>
		</Route>
	)
)

export default function App() {

  return (
	<RouterProvider router={router} />
  );
}

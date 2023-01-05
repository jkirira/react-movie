import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import HomeLayout from "./assets/js/components/layouts/HomeLayout";

import Home from "./assets/js/components/pages/Home";
import ErrorPage from "./assets/js/components/pages/ErrorPage";
import MovieDetails from "./assets/js/components/pages/MovieDetails";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<HomeLayout />}>
			<Route errorElement={<ErrorPage />}>
				<Route index element={<Home />} />
				<Route path="/movies/:movie_id" element={<MovieDetails />} errorElement={<ErrorPage />} />
			</Route>
		</Route>
	)
)

export default function App() {

  return (
	<RouterProvider router={router} />
  );
}

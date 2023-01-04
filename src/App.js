import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import HomeLayout from "./assets/js/components/layouts/HomeLayout";

import Home from "./assets/js/components/pages/Home";
import ErrorPage from "./assets/js/components/pages/ErrorPage";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<HomeLayout />}>
			<Route errorElement={<ErrorPage />}>
				<Route index element={<Home />} />
			</Route>
		</Route>
	)
)

export default function App() {

  return (
	<RouterProvider router={router} />
  );
}

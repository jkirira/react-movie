import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Footer from "../partials/Footer";

export default function HomeLayout() {

    return (
        <>
            <Header />
            <div className="content">
                <Sidebar />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
    );
}

import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";

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
        </>
    );
}

import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar () {
    return (
        <div className="sidebar">

            <nav className="sidebar-nav">
                <ul className="sidebar-nav-list">
                    <li className="sidebar-nav-list-item">
                        <NavLink to="/" className={ ({ isActive }) => isActive ? 'active' : '' }>
                            Home
                        </NavLink>
                    </li>
                </ul>
            </nav>

        </div>
    );
}
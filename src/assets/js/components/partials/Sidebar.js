import React, { useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export default function Sidebar () {

    const HamburgerIcon = useMemo(() => <FontAwesomeIcon icon={solid('bars')} />, []);

    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        let toggle_sidebar = sidebarRef.current.getAttribute('data-toggle-sidebar') !== 'show' ? 'show' : 'hide';
        sidebarRef.current.setAttribute('data-toggle-sidebar', toggle_sidebar);
    }

    return (
        <div className="sidebar" ref={sidebarRef}>

            <nav className="sidebar-nav">
                <ul className="sidebar-nav-list">
                    <li className="sidebar-nav-list-item">
                        <NavLink to="/" className={ ({ isActive }) => isActive ? 'active' : '' }>
                            Home
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-toggle" onClick={toggleSidebar}>
                { HamburgerIcon }
            </div>

        </div>

    );
}

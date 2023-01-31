import React, { useMemo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

function Sidebar () {

    const HamburgerIcon = useMemo(() => <FontAwesomeIcon icon={solid('bars')} />, []);

    const sidebarRef = useRef(null);

    const openSidebar = () => {
        sidebarRef.current.setAttribute('data-toggle-sidebar', 'show');
    }

    const closeSidebar = () => {
        sidebarRef.current.setAttribute('data-toggle-sidebar', 'hide');
    }

    const toggleSidebar = (e) => {
        e.stopPropagation();

        if (sidebarRef.current.getAttribute('data-toggle-sidebar') == 'show') {
            closeSidebar();
        } else {
            openSidebar();
        }
    }

    const handleOutsideClick = () => {
        if (sidebarRef.current.getAttribute('data-toggle-sidebar') == 'show') {
            closeSidebar();
        }
    }

    return (
        <div className="sidebar" ref={sidebarRef} onClick={handleOutsideClick}>
            <nav className="sidebar-nav">
                <ul className="sidebar-nav-list">
                    <li className="sidebar-nav-list-item">
                        <NavLink to="/" className={ ({ isActive }) => isActive ? 'active' : '' }>
                            Home
                        </NavLink>
                        <NavLink to="/movies" className={ ({ isActive }) => isActive ? 'active' : '' }>
                            Movies
                        </NavLink>
                        <NavLink to="/tv-shows" className={ ({ isActive }) => isActive ? 'active' : '' }>
                            Tv Shows
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-toggle" onClick={(e) => toggleSidebar(e)}>
                { HamburgerIcon }
            </div>

        </div>

    );
}

export default React.memo(Sidebar);

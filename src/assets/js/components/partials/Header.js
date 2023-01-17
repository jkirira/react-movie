import React, { useCallback, useMemo, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';


export default function Header() {

    const navRef = useRef(null);

    const toggleMenu = useCallback(() => {
        let toggle_menu = navRef.current.getAttribute('data-toggle-menu') !== 'show' ? 'show' : 'hide';
        navRef.current.setAttribute('data-toggle-menu', toggle_menu);
    }, [])


    const HamburgerIcon = useMemo(() => <FontAwesomeIcon icon={solid('bars')} onClick={toggleMenu} />, [toggleMenu])


    return (
        <div className="header">

            <div className="icon">
                Logo
            </div>

            
            <div className="menu">
                <div className="hamburger-icon">
                    { HamburgerIcon }
                </div>

                <nav ref={navRef} data-toggle-menu="hide">
                    <li>Profile</li>
                    <li>Profile</li>
                    <li>Profile</li>
                </nav>
            </div>

        </div>
    )
}

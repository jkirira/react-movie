import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function MainMenu() {
    const [expand, setExpand] = useState(false);
    const navRef = useRef(null);

    function toggleMenu() {
        let display = navRef.current.style.display;
        console.log(display);
        navRef.current.style.display =  display == 'flex' ? 'none' : 'flex';
    }

    return (
        <>
            <div className="hamburger-icon">
                {/* { HamburgerIcon } */}
                <FontAwesomeIcon icon={solid('bars')} onClick={toggleMenu} />
            </div>

            <nav ref={navRef}>
                <li>Profile</li>
                <li>Profile</li>
                <li>Profile</li>
            </nav>
        </>
    )
}
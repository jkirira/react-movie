import React from "react";

function SidebarIcon() {

    return (
        <div className="sidebar-toggle" onClick={toggleSidebar}>
            { HamburgerIcon }
        </div>
    )

}

export default React.memo(SidebarIcon);

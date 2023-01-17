import React from "react";

function LoadingComponent(props) {
    return (
        <div className="loading-component">
            
            <div className="loader"></div>
            
            { 
                props?.children 
                    ? props.children 
                    : <p>Loading...</p>
            }
        </div>
    )
}

export default React.memo(LoadingComponent);

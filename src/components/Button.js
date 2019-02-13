import React from "react";

export function Button(props) {
    let className = "btn btn-" + props.class;
    return(
        <div>
            <button
                className={className}
                onClick={props.handleClick}
            >
                {props.children}
            </button>
        </div>
    );
}
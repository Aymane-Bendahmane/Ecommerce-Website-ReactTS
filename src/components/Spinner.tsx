import React from "react";

export function Spinner(props) {
    return (

        <div className="ui active dimmer">
            <div className="ui text loader">
                {props.message}
            </div>
        </div>
    )
}

Spinner.defaultProps = {
    message: 'Loading ....'
}

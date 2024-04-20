import React from "react";

export function Spinner(props: { message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
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

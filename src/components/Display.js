import React from "react";

export class Display extends React.Component {

    render() {
        return (
            <div>
                <input id="history" value={this.props.history.join(' ')} className="display" type="text" disabled/>
                <input id="result" value={this.props.result} className="display" type="text" disabled/>
            </div>
        );
    }
}
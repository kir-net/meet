import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }

    render() {
        return (
            <div>
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'darkseagreen';
    }
}

class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'yellow';
    }
}

class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'orangered';
    }
}

export{InfoAlert, WarningAlert, ErrorAlert};
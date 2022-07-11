import React, { Component } from 'react';

class Event extends Component {
    state = {
        collapsed: true
    };

    handleClick = () => {
        this.setState({ collapsed: !this.state.collapsed })
    };


    toggleBtnText = () => {
        return `${this.state.collapsed 
            ? 'show details' 
            : 'hide details'
        }`;
    };

    render() {
        const { event } = this.props;

        return (
            <div className="event">
                <h3 className="title">{event.summary}</h3>
                <p className="location">{event.location}</p>
                <p className="start-time">
                    {event.start.dateTime}
                </p>               
                {!this.state.collapsed && (
                    <p className="event-details">
                        {event.description}
                        {event.htmlLink}
                    </p>
                )}
                <button 
                    className="btn-toggle-details" 
                    onClick={this.handleClick}>
                    {this.toggleBtnText()}
                </button>
            </div>
        );
    }
}
export default Event;
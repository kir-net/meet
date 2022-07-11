import React, { Component } from 'react';

class NumberOfEvents extends Component {
    
    state = {
        numberOfEvents: 32,
        ErrorText: ''
    };
    
    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value > 0 && value <= 32) {
            this.setState({ numberOfEvents: value, ErrorText: '' });
        } else {
            this.setState({ numberOfEvents: 32 });
        }
    };

    render() {
        return (
            <div className="numberOfEvents">
                <label htmlFor="events-number">Number of events: </label>
                <br />
                <input
                    type="number"
                    className="number-of-events"
                    value={this.state.numberOfEvents}
                    onChange={this.handleInputChanged}
                />
            </div>
        );
    }
}

export default NumberOfEvents; 
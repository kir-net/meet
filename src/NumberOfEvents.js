import React, { Component } from 'react';

class NumberOfEvents extends Component {
    
    state = {
        numberOfEvents: 32
    };
    
    handleInputChanged = (event) => {
        let actValue = parseInt(event.target.value)
        if (actValue > 0 && actValue <= 32) {
            this.setState({ numberOfEvents: actValue });
        } else {
            this.setState({ numberOfEvents: 32 });
        }
        this.props.updateEvents(undefined, actValue);
    };

    render() {
        return (
            <div className="numberOfEvents">
                <label htmlFor="number-of-events">Show max: </label>
                
                <input
                    type="number"
                    className="number-of-events"
                    min="1" 
                    max="32"
                    value={this.state.numberOfEvents}
                    onChange={this.handleInputChanged}

                />
            </div>
        );
    }
}

export default NumberOfEvents; 
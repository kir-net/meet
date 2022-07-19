import React, { Component } from 'react';
import {ErrorAlert} from './Alert';

class NumberOfEvents extends Component {
    
    state = {
        numberOfEvents: 32
    };
    
    handleInputChanged = (event) => {
        let actValue = parseInt(event.target.value)
        if (actValue > 0 && actValue <= 32) {
            this.setState({ 
                numberOfEvents: actValue,
                errorText: ''
             });
        } else if (actValue > 32 || actValue < 1) {
            this.setState({ 
                numberOfEvents: 32,
                errorText: 'Please choose a number between 1 and 32.'
            });
            actValue = 32;
        } else {
            this.setState({ 
                numberOfEvents: NaN,
                errorText: '' 
            });
            actValue = NaN;
        }
        this.props.updateEvents(undefined, actValue);
    };

    render() {
        return (
            <div>            
                <div className="numberOfEvents">
                <ErrorAlert className="errorAlert" text={this.state.errorText} /> 
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
            </div>
            
        );
    }
}

export default NumberOfEvents; 
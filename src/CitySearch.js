import React, { Component } from 'react';
import {InfoAlert} from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({ showSuggestions: true });
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: `No city with "${value}". Please try again.`
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: null
            });
        } 
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
            infoText: null
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">
                <InfoAlert className="InfoAlert" text={this.state.infoText} />
                <input
                    type="text"
                    id="city"
                    placeholder="Select city:"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                <ul 
                    className="suggestions" 
                    style={this.state.showSuggestions 
                        ? {}
                        : { display: 'none' }
                    }>
                    {
                        this.state.suggestions.map((suggestion) => (
                            <li
                                className="suggestions-item"
                                key={suggestion}
                                onClick={() => this.handleItemClicked(suggestion)}>{suggestion}
                            </li>
                        ))
                    }
                    <li onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch; 
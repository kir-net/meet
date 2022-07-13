import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';


class App extends Component {

    state = {
        events: [],
        locations: [],
        locationSelected: 'all',
        numberOfEvents: 24
    }

    componentDidMount() {
        this.mounted = true;
        getEvents().then((events) => {
            if (this.mounted) {
            this.setState({ events, locations: extractLocations(events) });
            }
        });
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    updateEvents = (location, maxNumEvents) => {
        if (maxNumEvents === undefined) {
            maxNumEvents = this.state.numberOfEvents;
        } else(
            this.setState({ numberOfEvents: maxNumEvents })
        )
        if (location === undefined) {
            location = this.state.locationSelected;
        }
        console.log(maxNumEvents, location)
        getEvents().then((events) => {
            const locationEvents = (location === 'all') 
                ? events 
                : events.filter((event) => event.location === location);
            this.setState({
                events: locationEvents.slice(0, maxNumEvents),
                numberOfEvents: maxNumEvents,
                locationSelected: location
            });
        });
    }

    render() {
        return (
            <div className="App">
                <CitySearch 
                    locations={this.state.locations}  
                    updateEvents={this.updateEvents} />
                <NumberOfEvents 
                    events={this.state.events}
                    updateEvents={this.updateEvents}/>
                <EventList 
                    events={this.state.events}/>        
            </div>
        );
    }
}

export default App;

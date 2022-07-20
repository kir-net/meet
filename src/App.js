import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { WarningAlert } from "./Alert";


class App extends Component {

    state = {
        events: [],
        locations: [],
        locationSelected: 'all',
        numberOfEvents: 32
    }

    async componentDidMount() {
        this.mounted = true;
        const isOffline = navigator.onLine ? false : true;
        this.setState({
            offlineInfo: isOffline
                ? "No internet connection. Data is loaded from cache."
                : null
        });
        getEvents().then((events) => {
            if (this.mounted) {
                this.setState({ 
                    events: events.slice(0, this.state.numberOfEvents), 
                    locations: extractLocations(events)
                });
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
        getEvents().then((events) => {
            let locationEvents = (location === 'all') 
                ? events 
                : events.filter((event) => event.location === location);
            const isOffline = navigator.onLine ? false : true;
            this.setState({
                events: locationEvents.slice(0, maxNumEvents),
                numberOfEvents: maxNumEvents,
                locationSelected: location,
                offlineInfo: isOffline
                    ? "No internet connection. Data is loaded from cache."
                    : null
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
                <div className="warningAlert">
                    <WarningAlert text={this.state.offlineInfo} />
                </div>
                <EventList 
                    events={this.state.events}/>  

            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { WarningAlert } from "./Alert";
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer} from 'recharts';




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

    getData = () => {
        let {locations, events} = this.state;
        let data = locations.map((location)=>{
            let number = events.filter((event) => event.location === location).length
            let city = location.split(', ').shift()
            return {city, number};
        })
        data = data.filter(data => (data.number >= 1))
        return data;
    };

    render() {
        let{locations, numberOfEvents, events} = this.state;
        return (
            <div className="App">  

                <CitySearch 
                    locations={locations} 
                    updateEvents={this.updateEvents} />

                <NumberOfEvents 
                    updateEvents={this.updateEvents}
                    numberOfEvents={numberOfEvents}/>
                    
                <div className="warningAlert">
                    <WarningAlert text={this.state.offlineInfo} />
                </div>

                <div className="data-vis-wrapper">
                    <h4>Event genres</h4>
                    <EventGenre  events={events} />

                    <h4>Events in each city</h4>
                    <ResponsiveContainer height={300} >
                        
                        <ScatterChart
                            className="scatterChart"
                            margin={{top: 20, right: 40, bottom: 60, left: 0}}
                            
                        >
                            <CartesianGrid className="grid"/>
                            <YAxis 
                                type="category" 
                                dataKey="city"
                                fontSize="normal"                           
                                tickMargin="5"                              
                                tick={{ fontSize: '13px', width: '15px', wordWrap: 'break-word' }}                             
                                textAnchor="end"
                                angle="325"/>
                            <XAxis 
                                type="number" 
                                dataKey="number" 
                                name="number of events"                             
                                allowDecimals={false}/>
                           
                            <Scatter 
                                data={this.getData()}  
                                fill="#2F5373" />
                        </ScatterChart>
                        
                    </ResponsiveContainer>
                </div>
                
                <EventList 
                    events={this.state.events}/>  

            </div>
        );
    }
}

export default App;

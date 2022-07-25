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
ResponsiveContainer} from 'recharts';




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
            city = city.split('- ').shift()
            return {city, number};
        })
        data = data.filter(data => (data.number >= 1))
        return data;
    };

    render() {
        let{locations, numberOfEvents, events} = this.state;
        return (
            <div className="App">  

                <h1>The Meet App</h1>
                <h3 className="subtitle">Search for your city and see upcoming events:</h3>

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

                    <h4>Number of events in each city</h4>
                    <ResponsiveContainer height={120+30*this.getData().length} >
                        
                        <ScatterChart
                            className="scatterChart"
                            margin={{top: 10, right: 30, bottom: 60, left: 25}}                         
                        >
                            <CartesianGrid fill="antiquewhite" className="grid"/>
                            <YAxis 
                                type="category" 
                                dataKey="city"                                    
                                tickMargin="5"                              
                                tick={{ fontSize: '13px', fill:"#2F5373"}}                             
                                textAnchor="end"
                                angle="344"/>
                            <XAxis 
                                type="number" 
                                dataKey="number" 
                                orientation="top"
                                tick={{ fontSize: '14px', fill:"#2F5373"}}  
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

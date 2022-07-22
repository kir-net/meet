import React, {useEffect, useState} from 'react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const EventGenre = ({events}) => {

    const [data, setData] = useState([]);

    const getData = () => {
        
        const genres = ['React','JavaScript','Node','jQuery','AngularJS'];

        let data = genres.map((genre) => {
            const value = events.filter((event) => 
                event.summary.split(' ').includes(genre)).length;
            return {
                name: genre,
                value: value
            };
        });
        return data;
    };
   
    useEffect(() => { 
        setData(() => getData()) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events]); 


    return (
        <ResponsiveContainer height={400}>
            <PieChart height={400}>
                <Pie
                    data={data.filter(data => (data.value >= 1))}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({name, percent}) =>
                        `${name} ${(percent*100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};


export default EventGenre;
    

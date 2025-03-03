import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [coords, setCoords] = useState({
        latitude: null,
        longitude: null
    });

    // API Key should ideally be stored in environment variables
    const API_KEY = "895284fb2d2c50a520ea537456963d9c";

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setCoords({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        });
    }, []);

    useEffect(() => {
        if (coords.latitude && coords.longitude) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&appid=${API_KEY}`;
            axios.get(url).then((response) => {
                setData(response.data);
            });
        }
    }, [coords]);

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${API_KEY}`;
            axios.get(url).then((response) => {
                setData(response.data);
            });
            setLocation("");
        }
    };

    return (
        <div className="app">
            <div className="search">
                <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyDown={searchLocation}
                    placeholder="Enter Location"
                    type="text"
                />
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? (
                            <h1>{data.main.temp.toFixed()}°F</h1>
                        ) : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>

                {data.name !== undefined && (
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? (
                                <p className="bold">
                                    {data.main.feels_like.toFixed()}°F
                                </p>
                            ) : null}
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            {data.main ? (
                                <p className="bold">{data.main.humidity}%</p>
                            ) : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? (
                                <p className="bold">
                                    {data.wind.speed.toFixed()} MPH
                                </p>
                            ) : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

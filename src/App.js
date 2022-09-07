import React from "react";
import axios from "axios";
import { useState } from "react";
import "./App.css";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";

console.log(process.env);

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios.get(url).then((response) => {
                setData(response.data);
                console.log(response.data);
            });
            setLocation("");
        }
    };

    return (
        <div className="app">
            <div className="container">
                <div className="search">
                    <input
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        onKeyPress={searchLocation}
                        placeholder="Enter location"
                        type="text"
                    />
                </div>
                <div className="date-time">
                    moment().format('MMMM Do YYYY, h:mm:ss a')
                </div>

                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp}ºC</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}

                        {/*{data.weather ? <p>{data.weather[0].description}</p> : null}*/}
                    </div>
                </div>
                {data.name !== undefined && (
                    <div className="bottom">
                        <div className="min-temp">
                            {data.main ? (
                                <p className="bold">{data.main.temp_min}ºC</p>
                            ) : null}

                            <p>Min</p>
                        </div>
                        <div className="max-temp">
                            {data.main ? (
                                <p className="bold">{data.main.temp_max}ºC</p>
                            ) : null}

                            <p>Max</p>
                        </div>
                        <div className="feels">
                            <div className="icon">
                                <FaTemperatureHigh />
                            </div>

                            {data.main ? (
                                <p className="bold">
                                    {data.main.feels_like} ºC
                                </p>
                            ) : null}

                            <p>Feels like</p>
                        </div>
                        <div className="humidity">
                            <div className="icon">
                                <WiHumidity />
                            </div>

                            {data.main ? (
                                <p className="bold">{data.main.humidity} %</p>
                            ) : null}
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            <div className="icon">
                                <GiWhirlwind />
                            </div>

                            {data.wind ? (
                                <p className="bold">{data.wind.speed} MPH</p>
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

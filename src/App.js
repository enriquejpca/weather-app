import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { GiWhirlwind } from "react-icons/gi";
//import ReactTypingEffect from "react-typing-effect";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");
    const [dateState, setDateState] = useState(new Date());

    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    const searchLocation = (event) => {
        if (event.key === "Enter") {
            axios
                .get(url)
                .then((response) => {
                    setData(response.data);
                    console.log(response.data);
                })
                .catch((err) =>
                    Swal.fire({
                        title: "Oh, something went wrong!",

                        text: "Try it again",
                        icon: "error",
                        iconColor: "red",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "black",
                    })
                );
            setLocation("");
        }
    };

    return (
        <div
            className={`app ${
                typeof data.main !== "undefined"
                    ? data.main.temp > 20
                        ? "app-cold"
                        : "app"
                    : "app"
            }`}
        >
            <div className="container">
                <div className="search">
                    <input
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        onKeyPress={searchLocation}
                        placeholder="Enter location"
                        type="text"
                    />
                    <div className="date-time-container">
                        <p className="date-container">
                            {" "}
                            {dateState.toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            })}
                        </p>
                        <p className="time-container">
                            {dateState.toLocaleString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                            })}
                        </p>
                    </div>
                </div>

                <motion.div
                    className="top"
                    initial={{
                        x: 0,
                        transition: {
                            type: "spring",
                            duration: 3,
                        },
                    }}
                    animate={{
                        x: 0,

                        transition: {
                            delay: 0.5,
                            x: { duration: 1 },
                            default: { ease: "linear" },
                        },
                    }}
                    whileHover={{
                        scale: 1.3,
                        rotate: 360,
                        transition: { type: "spring", duration: 2 },
                    }}
                    whileTap={{
                        scale: 1,
                        rotate: 0,
                    }}
                >
                    <div className="location">
                        {/*<ReactTypingEffect text={[data.name]} />*/}
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp}ºC</h1> : null}
                    </div>

                    <div className="description">
                        {/*{data.weather ? <p>{data.weather[0].icon}</p> : null}*/}
                        {data.weather ? <p>{data.weather[0].main}</p> : null}

                        {/*{data.weather ? <p>{data.weather[0].description}</p> : null}*/}
                    </div>
                </motion.div>
                {data.name !== undefined && (
                    <div className="bottom">
                        <motion.div
                            className="min-temp"
                            whileHover={{
                                scale: 0.9,
                                transition: { type: "spring", duration: 1 },
                            }}
                        >
                            {data.main ? (
                                <p className="bold">{data.main.temp_min}ºC</p>
                            ) : null}

                            <p>Min</p>
                        </motion.div>
                        <motion.div
                            className="max-temp"
                            whileHover={{
                                scale: 0.9,
                                transition: { type: "spring", duration: 1 },
                            }}
                        >
                            {data.main ? (
                                <p className="bold">{data.main.temp_max}ºC</p>
                            ) : null}

                            <p>Max</p>
                        </motion.div>
                        <motion.div
                            className="feels"
                            whileHover={{
                                scale: 0.9,
                                transition: { type: "spring", duration: 1 },
                            }}
                        >
                            <div className="icon">
                                <FaTemperatureHigh />
                            </div>

                            {data.main ? (
                                <p className="bold">
                                    {data.main.feels_like} ºC
                                </p>
                            ) : null}

                            <p>Feels like</p>
                        </motion.div>
                        <motion.div
                            className="humidity"
                            whileHover={{
                                scale: 0.9,
                                transition: { type: "spring", duration: 1 },
                            }}
                        >
                            <div className="icon">
                                <WiHumidity />
                            </div>

                            {data.main ? (
                                <p className="bold">{data.main.humidity} %</p>
                            ) : null}
                            <p>Humidity</p>
                        </motion.div>
                        <motion.div
                            className="wind"
                            whileHover={{
                                scale: 0.9,
                                transition: { type: "spring", duration: 1 },
                            }}
                        >
                            <div className="icon">
                                <GiWhirlwind />
                            </div>

                            {data.wind ? (
                                <p className="bold">{data.wind.speed} MPH</p>
                            ) : null}
                            <p>Wind Speed</p>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

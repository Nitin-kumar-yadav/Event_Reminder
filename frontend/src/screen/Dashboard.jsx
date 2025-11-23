import React, { use, useEffect, useState } from 'react'
import { Clock2, ThermometerSun } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import CreateEventBox from './CreateEventBox';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
function Dashboard() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(false); // Controls visibility of CreateEventBox

    // ... (Your getCoordinates, fetchWeather, and weather useEffect blocks remain the same) ...
    const getCoordinates = async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    async function fetchWeather() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
            setWeatherData(response.data);
            console.log("Weather Data:", response.data.timezone);
        } catch (error) {
            toast.error("Failed to fetch weather data.");
            console.error("Error fetching weather data:", error);

        }
    }
    useEffect(() => {
        getCoordinates();
        if (latitude && longitude) {
            fetchWeather();
        }
        else {
            toast.error("Unable to retrieve location.");
            console.log("Waiting for coordinates...");
        }
    }, [latitude, longitude]);

    // ... (Your formatTime, formatFullDate, and clock useEffect blocks remain the same) ...
    const formatTime = (date) => date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    });
    const formatFullDate = (date) => date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    });

    useEffect(() => {
        const timerId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);
    const time = formatTime(dateTime);
    const date = formatFullDate(dateTime);

    const openEventBox = () => {
        setIsVisible(true);
    }

    return (
        <div className='pt-20'>
            {isVisible ? <CreateEventBox setIsVisible={setIsVisible} /> : (
                <>
                    <div className="flex flex-row justify-between max-w-8xl mx-5 h-[150px] ">
                        <div className="flex flex-col align-center justify-items-start w-[49%] rounded-2xl h-[150px] px-4 pt-5 bg-white/30 dark:bg-black/20 
                        backdrop-blur-md 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300">
                            <div className="">
                                <h1 className="text-base text-gray-500 font-medium">Current Time</h1>
                            </div>
                            <div className="flex flex-row justify-between aligin-center text-center">
                                <h1 className="text-5xl text-center aligin-center font-bold pt-2 text-transparent bg-clip-text 
                bg-gradient-to-r from-indigo-500 to-purple-400 ">{time}</h1>
                                <div className="">
                                    <Clock2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-base text-gray-500 font-medium">{date}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col align-center justify-items-start w-[49%] rounded-2xl h-[150px] px-4 pt-5 bg-white/30 dark:bg-black/20 
                        backdrop-blur-md 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300">
                            <div className="">
                                <h1 className="text-base text-gray-500 font-medium">Current Weather</h1>
                            </div>
                            <div className="flex flex-row justify-between aligin-center text-center">
                                <h1 className="text-5xl text-center aligin-center font-bold pt-2 text-transparent bg-clip-text 
                bg-gradient-to-r from-indigo-500 to-purple-400 ">{weatherData ? `${Math.round(weatherData.main.temp - 273.15)} C` : 'Loading...'}</h1>
                                <div className="">
                                    <ThermometerSun className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-base text-gray-500 font-medium">{weatherData?.name}, {weatherData?.sys?.country}</h1>
                            </div>
                        </div>

                    </div>
                    <div className="pt-5">
                        <div className="flex flex-row justify-between max-w-8xl mx-5 h-[100px] px-5 bg-white/30 dark:bg-black/20 
                        backdrop-blur-md 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300 rounded-xl">
                            <div className="flex flex-col justify-center gap-2 align-center ">
                                <h1 className='text-2xl text-transparent bg-clip-text 
                bg-gradient-to-r from-indigo-500 to-purple-400 font-extrabold'>Add Your Events</h1>
                                <p className='text-base text-gray-500 font-medium'>0 event scheduled</p>
                            </div>
                            <div className="flex justify-center align-center text-center pt-5">
                                <button onClick={openEventBox} className='bg-gray-200 dark:bg-gray-700 rounded-lg text-xl font-medium w-[150px] h-[45px] text-purple-400'>Add Event</button>
                            </div>
                        </div>
                    </div>
                </>
            )}


        </div>
    )
}

export default Dashboard
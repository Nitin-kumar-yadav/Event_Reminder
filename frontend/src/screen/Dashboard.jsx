import React, { use, useEffect, useState } from 'react'
import { Clock2, ThermometerSun } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import CreateEventBox from './CreateEventBox';
import EventCard from './EventCard';
import { useUserEventsStore } from '../store/userEvents';


const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
function Dashboard() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [dateTime, setDateTime] = useState(new Date());
    const [isVisible, setIsVisible] = useState(false);

    const { userEvents } = useUserEventsStore();
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

        <div className='pt-20 w-full mx-auto max-w-7xl px-4 md:px-6'>
            {isVisible ? <CreateEventBox setIsVisible={setIsVisible} /> : (
                <>

                    <div className="flex flex-col md:flex-row justify-between w-full gap-4 mb-6">


                        <div className="flex flex-col flex-1 rounded-2xl h-auto min-h-[150px] p-5 
                            bg-white/30 dark:bg-black/20 backdrop-blur-md 
                            border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300">

                            <h1 className="text-base text-gray-500 font-medium mb-1">Current Time</h1>

                            <div className="flex justify-between items-center flex-1">
                                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
                                    bg-gradient-to-r from-indigo-500 to-purple-400">
                                    {time}
                                </h1>
                                <div>
                                    <Clock2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>

                            <h1 className="text-base text-gray-500 font-medium mt-1">{date}</h1>
                        </div>


                        <div className="flex flex-col flex-1 rounded-2xl h-auto min-h-[150px] p-5 
                            bg-white/30 dark:bg-black/20 backdrop-blur-md 
                            border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300">

                            <h1 className="text-base text-gray-500 font-medium mb-1">Current Weather</h1>

                            <div className="flex justify-between items-center flex-1">
                                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
                                    bg-gradient-to-r from-indigo-500 to-purple-400">
                                    {weatherData ? `${Math.round(weatherData.main.temp - 273.15)}°C` : 'Loading...'}
                                </h1>
                                <div>
                                    <ThermometerSun className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>

                            <h1 className="text-base text-gray-500 font-medium mt-1">
                                {weatherData ? `${weatherData.name}, ${weatherData.sys.country}` : 'Fetching location...'}
                            </h1>
                        </div>

                    </div>

                    <div className="pt-2 mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-center h-auto min-h-[100px] p-5 
                            bg-white/30 dark:bg-black/20 backdrop-blur-md 
                            border border-white/20 dark:border-white/10 shadow-lg transition-all duration-300 rounded-xl">

                            <div className="flex flex-col justify-center items-start sm:items-start gap-1 mb-3 sm:mb-0">
                                <h1 className='text-2xl text-transparent bg-clip-text 
                                    bg-gradient-to-r from-indigo-500 to-purple-400 font-extrabold'>
                                    Manage Your Events
                                </h1>
                                <p className='text-base text-gray-500 font-medium'>
                                    You have **{userEvents.length}** event{userEvents.length !== 1 ? 's' : ''} scheduled.
                                </p>
                            </div>

                            <div className="w-full sm:w-auto flex justify-center items-center">
                                <button
                                    onClick={openEventBox}
                                    className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                                    text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300
                                    w-full sm:w-[150px] h-[45px] text-base'
                                >
                                    + Add Event
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <EventCard />
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard
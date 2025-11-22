import React, { useEffect, useState } from 'react';
import { Clock, Droplet, Wind, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const formatTime = (date) => date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
});

const formatFullDate = (date) => date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
});

const Dashboard = () => {
    const [dateTime, setDateTime] = useState(new Date());

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);

    const [weatherData, setWeatherData] = useState(null);
    const [weatherLoading, setWeatherLoading] = useState(false);

    useEffect(() => {
        const timerId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    useEffect(() => {
        if (!navigator.geolocation) {
            const notSupportedMessage = "Geolocation is not supported by your browser.";
            setError(notSupportedMessage);
            toast.error(notSupportedMessage);
            return;
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        const successCallback = (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
            setError(null);
        };

        const errorCallback = (err) => {
            let errorMessage;
            if (err.code === err.PERMISSION_DENIED) {
                errorMessage = "Geolocation permission denied. Please enable it in your browser settings.";
            } else if (err.code === err.POSITION_UNAVAILABLE) {
                errorMessage = "Location information is unavailable.";
            } else if (err.code === err.TIMEOUT) {
                errorMessage = "Timed out waiting for location.";
            } else {
                errorMessage = `Geolocation error: Code ${err.code}`;
            }

            setError(errorMessage);
            toast.error(errorMessage);
            setLatitude(null);
            setLongitude(null);
        };

        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

    }, []);
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            const fetchWeather = async () => {
                setWeatherLoading(true);
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;

                try {
                    const response = await axios.get(url);
                    if (!response.data.ok) {
                        throw new Error(`Weather fetch failed: ${response.statusText}`);
                    }
                    const data = await response.data;
                    setWeatherData(data);
                } catch (e) {
                    const errorMessage = `Failed to load weather: ${e.message}`;
                    setError(errorMessage);
                    toast.error(errorMessage);
                } finally {
                    setWeatherLoading(false);
                }
            };
            fetchWeather();
        }
    }, [latitude, longitude]);

    const tempInCelsius = weatherData?.main?.temp?.toFixed(1);
    const city = weatherData?.name || "Unknown Location";
    const weatherDescription = weatherData?.weather?.[0]?.description;
    const humidity = weatherData?.main?.humidity;
    const windSpeed = weatherData?.wind?.speed;

    const time = formatTime(dateTime);
    const date = formatFullDate(dateTime);
    console.log(WEATHER_API_KEY)


    return (
        <div className="pt-20">
            <div className="flex flex-col md:flex-row justify-center items-stretch gap-5 max-w-8xl mx-auto px-5">

                {/* --- Time and Date Card --- */}
                <div className="w-full md:w-1/2 min-h-[20vh] border-2 rounded-3xl p-5 bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-300">CURRENT TIME & DATE</p>
                        <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">
                        {time}
                    </h2>
                    <p className="text-xl font-medium text-gray-800 dark:text-gray-200">
                        {date}
                    </p>
                </div>

                {/* --- Weather Card --- */}
                <div className="w-full md:w-1/2 min-h-[20vh] border-2 rounded-3xl p-5 bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white shadow-lg">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-300">WEATHER IN {city.toUpperCase()}</p>
                        <MapPin className="w-6 h-6 text-red-500" />
                    </div>

                    {weatherLoading ? (
                        <p className="text-xl font-medium text-gray-600 dark:text-gray-400">Loading weather...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : tempInCelsius ? (
                        <>
                            <h2 className="text-5xl font-extrabold text-green-600 dark:text-green-400 mb-2">
                                {tempInCelsius}°C
                            </h2>
                            <p className="text-xl font-medium text-gray-800 dark:text-gray-200 capitalize">
                                {weatherDescription}
                            </p>
                            <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                                <p className='flex items-center'><Droplet className='w-4 h-4 mr-1' /> Humidity: {humidity}%</p>
                                <p className='flex items-center'><Wind className='w-4 h-4 mr-1' /> Wind: {windSpeed} m/s</p>
                            </div>
                        </>
                    ) : (
                        <p className="text-xl font-medium text-gray-600 dark:text-gray-400">Enable location to see weather.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
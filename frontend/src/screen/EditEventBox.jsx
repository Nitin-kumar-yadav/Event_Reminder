import React, { useState, useEffect } from 'react';
import { useUserEventsStore } from '../store/userEvents';
import { useUserAuthStore } from '../store/userAuthStore';
import toast from 'react-hot-toast';

const EditEventBox = ({ setIsVisible, eventToEdit }) => {

    if (!eventToEdit) {
        return null;
    }

    const { checkAuth } = useUserAuthStore();
    const { updateEvent } = useUserEventsStore();
    const [eventData, setEventData] = useState({
        title: eventToEdit.title || '',
        description: eventToEdit.description || '',
        date: eventToEdit.date || '',
        time: eventToEdit.time || ''
    });

    useEffect(() => {
        checkAuth();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!eventData.title || !eventData.description || !eventData.date || !eventData.time) {
            toast.error("Please fill in all fields");
            return;
        }


        updateEvent(eventToEdit._id, eventData);
        setIsVisible(false);
    };

    return (
        <div className='h-[80vh] w-full flex items-center justify-center p-4'>
            <div className="w-full max-w-md 
             bg-white/30 dark:bg-black/30 
             backdrop-blur-xl 
             border border-white/40 dark:border-white/10
             shadow-2xl rounded-2xl p-8 
             transition-all duration-300">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        Edit Event
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        Updating event: {eventToEdit.title}
                    </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="relative group">
                        <input
                            type="text"
                            name="title"
                            placeholder="Event Title"
                            required
                            value={eventData.title}
                            className="w-full pl-5 pr-4 py-3 rounded-lg 
                             bg-white/50 dark:bg-gray-800/50 
                             border border-gray-200 dark:border-gray-700
                             text-gray-900 dark:text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative group">
                        <input
                            type={"text"}
                            name="description"
                            placeholder="Event Description"
                            required
                            value={eventData.description}
                            className="w-full pl-5 pr-10 py-3 rounded-lg 
                             bg-white/50 dark:bg-gray-800/50 
                             border border-gray-200 dark:border-gray-700
                             text-gray-900 dark:text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type={"date"}
                            name="date"
                            placeholder="Event Date"
                            required
                            value={eventData.date}
                            className="w-full pl-5 pr-10 py-3 rounded-lg 
                             bg-white/50 dark:bg-gray-800/50 
                             border border-gray-200 dark:border-gray-700
                             text-gray-900 dark:text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative group">
                        <input
                            type={"time"}
                            name="time"
                            placeholder="Event Time"
                            required
                            value={eventData.time}
                            className="w-full pl-5 pr-10 py-3 rounded-lg 
                             bg-white/50 dark:bg-gray-800/50 
                             border border-gray-200 dark:border-gray-700
                             text-gray-900 dark:text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200"
                            onChange={handleChange}
                        />
                    </div>

                    <div className='flex flex-row justify-center align-center w-full gap-4' >
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                            text-white font-bold rounded-lg shadow-lg hover:shadow-xl 
                            transform hover:-translate-y-0.5 transition-all duration-200
                            flex items-center justify-center gap-2"
                        >
                            Update Event
                        </button>
                        <button
                            type="button"
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                            text-white font-bold rounded-lg shadow-lg hover:shadow-xl 
                            transform hover:-translate-y-0.5 transition-all duration-200
                            flex items-center justify-center gap-2"
                            onClick={() => setIsVisible(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEventBox
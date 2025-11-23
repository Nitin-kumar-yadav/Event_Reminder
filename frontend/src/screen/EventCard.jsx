import { Calendar, Clock1 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useUserEventsStore } from '../store/userEvents'
import EditEventBox from './EditEventBox';

const EventCard = () => {

    const { userEvents, getEvents, deleteEvent } = useUserEventsStore();
    const isEventsLoading = useUserEventsStore(state => state.isEventsLoading);

    const [isVisible, setIsVisible] = useState(false);

    const [eventToEdit, setEventToEdit] = useState(null);

    useEffect(() => {
        getEvents();
    }, []);

    useEffect(() => {
        console.log("User Events:", userEvents);
    }, [userEvents]);

    if (isEventsLoading) {
        return <div className='p-4 text-center text-gray-500'>Loading events...</div>;
    }

    if (!userEvents || userEvents.length === 0) {
        return <div className='p-4 text-center text-gray-500'>No events scheduled yet.</div>;
    }

    const handleDelete = (eventId) => {
        deleteEvent(eventId);
    }


    const handleEdit = (event) => {

        setEventToEdit(event);
        setIsVisible(true);
    }

    return (
        <>
            {isVisible && eventToEdit ? (
                <EditEventBox
                    setIsVisible={setIsVisible}
                    eventToEdit={eventToEdit}
                />
            ) : (
                <div className='flex flex-wrap gap-4 p-4'>
                    {userEvents.map((event) => (
                        <div
                            key={event._id}
                            className='w-[400px] h-[200px] mx-1 p-4 rounded-xl bg-white/30 dark:bg-black/20 
                            backdrop-blur-md 
                            border-b border-white/20 dark:border-white/10
                            shadow-lg transition-all duration-300'
                        >

                            <div className="pt-3">
                                <h1 className='text-xl text-transparent bg-clip-text 
                                bg-gradient-to-r from-indigo-500 to-purple-400 font-bold'>
                                    {event.title}
                                </h1>
                            </div>
                            <div className="pt-4">
                                <p className='text-base text-gray-500 font-medium line-clamp-1'>
                                    {event.description}
                                </p>
                            </div>
                            <div className="flex flex-row justify-evenly align-center pt-4">
                                <div className="flex flex-row justify-center align-center gap-2">
                                    <p className='text-base text-gray-500 font-medium'>
                                        {event.date}
                                    </p>
                                    <Calendar className='w-5 h-5 text-indigo-500' />
                                </div>
                                <div className="flex flex-row justify-center align-center gap-2">
                                    <p className='text-base text-gray-500 font-medium'>
                                        {event.time}
                                    </p>
                                    <Clock1 className='w-5 h-5 text-indigo-500' />
                                </div>
                            </div>

                            <div className="flex flex-row justify-evenly align-center pt-4 w-full gap-4">
                                <button
                                    className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                                    text-white font-bold rounded-lg shadow-lg hover:shadow-xl 
                                    transform hover:-translate-y-0.5 transition-all duration-200
                                    flex items-center justify-center w-[49%] h-[35px]'
                                    onClick={() => handleDelete(event._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                                    font-bold rounded-lg shadow-lg hover:shadow-xl 
                                    transform hover:-translate-y-0.5 transition-all duration-200
                                    flex items-center justify-center w-[49%] h-[35px] text-white'

                                    onClick={() => handleEdit(event)}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default EventCard
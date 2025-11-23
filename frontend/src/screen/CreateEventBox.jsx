import React, { useState } from 'react'

const CreateEventBox = ({ setIsVisible }) => {

    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        date: '',
        time: ''
    })


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
                        Create Event
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        Fill in the details to create a new event.
                    </p>
                </div>

                <form className="space-y-5">
                    <div className="relative group">
                        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <p className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" >Event Title</p>
                        </div> */}
                        <input
                            type="text"
                            name={eventData.title}
                            placeholder="Event Title"
                            required
                            className="w-full pl-5 pr-4 py-3 rounded-lg 
                         bg-white/50 dark:bg-gray-800/50 
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-200"
                            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                        />
                    </div>
                    <div className="relative group">
                        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <p className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" >Event Discription</p>
                        </div> */}
                        <input
                            type={"text"}
                            name={eventData.description}
                            placeholder="Event Description"
                            required
                            className="w-full pl-5 pr-10 py-3 rounded-lg 
                         bg-white/50 dark:bg-gray-800/50 
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-200"
                            onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                        />

                    </div>
                    <div className="relative group">
                        {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <p className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" >Event Date</p>
                        </div> */}
                        <input
                            type={"date"}
                            name={eventData.date}
                            placeholder="Event Date"
                            required
                            className="w-full pl-5 pr-10 py-3 rounded-lg 
                         bg-white/50 dark:bg-gray-800/50 
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-200"
                            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                        />

                    </div>
                    <div className="relative group">
                        <input
                            type={"time"}
                            name={eventData.time}
                            placeholder="Event Time"
                            required
                            className="w-full pl-5 pr-10 py-3 rounded-lg 
                         bg-white/50 dark:bg-gray-800/50 
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-200"
                            onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
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
                            Create Event
                        </button>
                        <button
                            type="submit"
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
    )
}

export default CreateEventBox
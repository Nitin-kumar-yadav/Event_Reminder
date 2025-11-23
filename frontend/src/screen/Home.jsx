import React from 'react'
import { Calendar, BellRing, DatabaseZap } from 'lucide-react';

const Home = () => {
    return (
        <div className="pt-10 pb-20 px-4">
            <div className="max-w-4xl mx-auto py-10 md:py-20 text-center">
                <div className=''>
                    <Calendar className="mx-auto mb-4 w-16 h-16 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text 
                bg-gradient-to-r from-indigo-500 to-purple-400">
                    Welcome to Event Reminder
                </h1>
                <p className="text-lg md:text-xl mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Never miss an important event again! **Manage and get personalized reminders** for all your special occasions in one simple place.
                </p>
                <a
                    href="/signup"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                    text-white rounded-full text-lg font-bold 
                    hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
                    shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                    Get Started Now
                </a>
            </div>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center gap-6 md:gap-8 lg:gap-10 px-4">
                <div className="flex-1 w-full md:w-1/3 rounded-xl text-center p-6 sm:p-8 
                    bg-white/30 dark:bg-black/20 backdrop-blur-md 
                    border border-white/20 dark:border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <div className="mb-4">
                        <BellRing className="mx-auto w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text 
                        bg-gradient-to-r from-indigo-500 to-purple-400">Smart Reminders</h3>
                        <p className="text-gray-600 dark:text-gray-400">Get notified at the right time, so you never miss a single commitment.</p>
                    </div>
                </div>
                <div className="flex-1 w-full md:w-1/3 rounded-xl text-center p-6 sm:p-8 
                    bg-white/30 dark:bg-black/20 backdrop-blur-md 
                    border border-white/20 dark:border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <div className="mb-4">
                        <Calendar className="mx-auto w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text 
                        bg-gradient-to-r from-indigo-500 to-purple-400">Easy Management</h3>
                        <p className="text-gray-600 dark:text-gray-400">Add, edit, and organize all your events quickly with a beautiful, intuitive interface.</p>
                    </div>
                </div>

                <div className="flex-1 w-full md:w-1/3 rounded-xl text-center p-6 sm:p-8 
                    bg-white/30 dark:bg-black/20 backdrop-blur-md 
                    border border-white/20 dark:border-white/10 shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <div className="mb-4">
                        <DatabaseZap className="mx-auto w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text 
                        bg-gradient-to-r from-indigo-500 to-purple-400">Real-time Data
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">View live weather conditions and current time right from your dashboard.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
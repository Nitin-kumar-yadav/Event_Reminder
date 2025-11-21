import React from 'react'
import { Calendar, BellRing } from 'lucide-react';

const Home = () => {
    return (
        <div className=" pt-10">
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <div className=''>
                    <Calendar className="mx-auto mb-4 w-16 h-16 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text 
               bg-gradient-to-r from-indigo-500 to-purple-400">
                    Welcome to Event Reminder
                </h1>
                <p className="text-lg md:text-xl mb-8">
                    Never miss an important event again! Manage and get reminders for all your special occasions in one place.
                </p>
                <a
                    href="/signup"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    Get Started
                </a>
            </div>
            <div className="flex justify-center gap-10">
                <div className="rounded-xl text-center align-middle w-1/6 p-5 bg-white/30 dark:bg-black/20 
                        backdrop-blur-md 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300">
                    <div className="">
                        <BellRing className="mx-auto mb-4 w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text 
               bg-gradient-to-r from-indigo-500 to-purple-400">Smart Reminders</h3>
                        <p>Get notified at the right time, never miss important events</p>
                    </div>
                </div>
                <div className="rounded-xl text-center align-middle w-1/6 p-5 bg-white/30 dark:bg-black/20 
                        backdrop-blur-md 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300">
                    <div className="">
                        <Calendar className="mx-auto mb-4 w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text 
               bg-gradient-to-r from-indigo-500 to-purple-400">Easy Management</h3>
                        <p>Add, edit, and organize events with a beautiful interface</p>
                    </div>
                </div>
                <div className="rounded-xl text-center align-middle w-1/6 p-5 bg-white/30 dark:bg-black/20 
                        backdrop-blur-md 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300">
                    <div className="">
                        <BellRing className="mx-auto mb-4 w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="">
                        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text 
               bg-gradient-to-r from-indigo-500 to-purple-400">Real-time Updates
                        </h3>
                        <p>Stay updated with live weather and current time display</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
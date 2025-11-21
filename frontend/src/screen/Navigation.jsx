import React from 'react';
import ThemeToggle from '../components/ThemeToggle';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-16 px-6
                        flex items-center justify-between
                        bg-white/30 dark:bg-black/20 
                        backdrop-blur-md 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300">

            <div className="text-xl font-bold tracking-wide text-gray-800 dark:text-white drop-shadow-sm">
                <Link to="/">Event Reminder</Link>
            </div>

            <div>
                <ul className="flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-200">

                    <li>
                        <Link
                            to="/"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/signup"
                            className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
                        >
                            Signup
                        </Link>
                    </li>
                    <li className="border-l border-gray-300 dark:border-gray-600 pl-6">
                        <ThemeToggle />
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
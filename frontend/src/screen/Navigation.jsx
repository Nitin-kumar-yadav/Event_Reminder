import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { Link } from 'react-router-dom';
import { useUserAuthStore } from '../store/userAuthStore';

const Navigation = () => {

    const { authUser, checkAuth } = useUserAuthStore();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    const handleNavigation = () => {
        setIsMenuOpen(false);
    };

    const logout = () => {
        useUserAuthStore.getState().logout();
        setIsMenuOpen(false);
    }

    const navLinks = [
        { name: 'Home', path: '/', isButton: false },
        ...(authUser
            ? [
                { name: 'Dashboard', path: '/', isButton: false },
                { name: 'Logout', action: logout, isButton: true },
                { name: `${authUser?.name}`, path: '/', isButton: false },
            ]
            : [
                { name: 'Login', path: '/login', isButton: false },
                { name: 'Sign Up', path: '/signup', isButton: false },
            ]
        ),
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-16 px-4 sm:px-6
                        flex items-center justify-between
                        bg-white/30 dark:bg-black/20 
                        backdrop-blur-lg 
                        border-b border-white/20 dark:border-white/10
                        shadow-lg transition-all duration-300">
            <div className="text-xl font-bold tracking-wide text-gray-800 dark:text-white drop-shadow-sm">
                <Link
                    className='text-transparent bg-clip-text 
                    bg-gradient-to-r from-indigo-500 to-purple-400'
                    to="/"
                    onClick={handleNavigation}
                >
                    Event Reminder
                </Link>
            </div>
            <div className="flex items-center gap-4 md:hidden">
                <ThemeToggle />
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-gray-200">
                <ul className="flex items-center gap-8">
                    {navLinks.map((item) => (
                        <li key={item.name}>
                            {item.isButton ? (
                                <button
                                    onClick={item.action}
                                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                    <li className="border-l border-gray-300 dark:border-gray-600 pl-6">
                        <ThemeToggle />
                    </li>
                </ul>
            </div>

            <div
                className={`absolute top-16 left-0 w-full h-[calc(100vh-4rem)]
                            bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl
                            transform transition-transform duration-300 ease-in-out -z-50
                            ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} 
                            md:hidden`}
            >
                <ul className="flex flex-col items-start gap-1 p-4 text-base font-medium text-gray-700 dark:text-gray-200">
                    {navLinks.map((item) => (
                        <li key={item.name} className="w-full">
                            {item.isButton ? (
                                <button
                                    onClick={item.action}
                                    className="block w-full text-left py-3 px-2 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                                >
                                    {item.name}
                                </button>
                            ) : (
                                <Link
                                    to={item.path}
                                    className="block w-full py-3 px-2 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                                    onClick={handleNavigation}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
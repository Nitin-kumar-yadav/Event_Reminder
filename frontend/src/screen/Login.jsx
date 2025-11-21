import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle'; // Assuming you have this from before
import toast from 'react-hot-toast';
import { useUserAuthStore } from '../store/userAuthStore';

const Login = () => {
    const [formData, setFormData] = useState({

        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, isLoggingIn } = useUserAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        login(formData).catch((err) => {
            setError('Login failed. Please check your credentials and try again.');
        });
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) {
            toast.error(error);
            setError('');
        }
    };



    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4
                    bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100
                    dark:from-gray-900 dark:via-gray-800 dark:to-black
                    transition-colors duration-300">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="w-full max-w-md 
                      bg-white/30 dark:bg-black/30 
                      backdrop-blur-xl 
                      border border-white/40 dark:border-white/10
                      shadow-2xl rounded-2xl p-8 
                      transition-all duration-300">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        Log In
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        Welcome back! Please enter your details.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className="w-full pl-10 pr-4 py-3 rounded-lg 
                         bg-white/50 dark:bg-gray-800/50 
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-200"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock size={18} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full pl-10 pr-10 py-3 rounded-lg 
                         bg-white/50 dark:bg-gray-800/50 
                         border border-gray-200 dark:border-gray-700
                         text-gray-900 dark:text-white placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                         transition-all duration-200"
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {error && (
                        <p className="text-red-500 text-xs text-center font-medium bg-red-100 dark:bg-red-900/30 p-2 rounded">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
                       text-white font-bold rounded-lg shadow-lg hover:shadow-xl 
                       transform hover:-translate-y-0.5 transition-all duration-200
                       flex items-center justify-center gap-2"
                    >
                        Sign Up <ArrowRight size={18} />
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Do not have an account?{' '}
                    <Link to="/Signup" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;
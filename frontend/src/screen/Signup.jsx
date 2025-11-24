import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useUserAuthStore } from '../store/userAuthStore';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();

    const { signup, otpVerify, isSignUp, isOtpVerifying } = useUserAuthStore();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // ------------------ HANDLE INPUT ------------------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    // ------------------ SIGNUP ------------------
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        const { password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        else if (password.length < 6 || password.length > 12) {
            return setError("Password must be between 6 and 12 characters");
        }
        else {
            try {
                const result = await toast.promise(
                    signup(formData),
                    {
                        loading: "Creating account...",
                        success: "OTP sent successfully!",
                        error: "Signup failed! Try again."
                    }
                );

                if (result) setStep(2);
            } catch (err) {
                setError("Signup failed");
            }
        }
    };

    // ------------------ OTP VERIFY ------------------
    const handleOtpSubmit = async (e) => {
        e.preventDefault();

        if (!otp || otp.length < 4) {
            return toast.error("Enter valid OTP");
        }

        const result = await toast.promise(
            otpVerify({ email: formData.email, otp }),
            {
                loading: "Verifying OTP...",
                success: "Verification successful!",
                error: "Invalid OTP. Try again."
            }
        );

        if (result) {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4
        bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        transition-colors duration-300">

            {/* THEME TOGGLE */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            {/* ----------------------------------------------------------- */}
            {/* ---------------------- SIGNUP STEP ------------------------ */}
            {/* ----------------------------------------------------------- */}

            {step === 1 && (
                <div className="w-full max-w-md bg-white/30 dark:bg-black/30 backdrop-blur-xl 
            border border-white/40 dark:border-white/10 shadow-2xl rounded-2xl p-8">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text 
              bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Create Account
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                            Join us to manage your events efficiently
                        </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">

                        {/* Username */}
                        <div className="relative">
                            <User size={18} className="absolute inset-y-4 left-3 text-gray-400" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg 
                  bg-white/50 dark:bg-gray-800/50 border border-gray-300 
                  dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail size={18} className="absolute inset-y-4 left-3 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-lg 
                  bg-white/50 dark:bg-gray-800/50 border border-gray-300 
                  dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <Lock size={18} className="absolute inset-y-4 left-3 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                required
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-3 rounded-lg 
                  bg-white/50 dark:bg-gray-800/50 border border-gray-300 
                  dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <Lock size={18} className="absolute inset-y-4 left-3 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                onChange={handleChange}
                                className={`w-full pl-10 pr-4 py-3 rounded-lg 
                  bg-white/50 dark:bg-gray-800/50 
                  border ${error ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
                  text-gray-900 dark:text-white`}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-500 text-xs text-center font-medium">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSignUp}
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600
                text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
                        >
                            {isSignUp ? "Creating..." : <>Sign Up <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                            Log in
                        </Link>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="w-full max-w-md bg-white/30 dark:bg-black/30 backdrop-blur-xl 
            border border-white/40 dark:border-white/10 shadow-2xl rounded-2xl p-8">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text
              bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Enter Verification Code
                        </h2>
                    </div>

                    <form onSubmit={handleOtpSubmit} className="space-y-5">

                        <div className="relative">
                            <User size={18} className="absolute inset-y-4 left-3 text-gray-400" />
                            <input
                                type="number"
                                name="otp"
                                placeholder="OTP Code"
                                required
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg 
                  bg-white/50 dark:bg-gray-800/50 border border-gray-300 
                  dark:border-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isOtpVerifying}
                            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600
                text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2"
                        >
                            {isOtpVerifying ? "Verifying..." : <>Verify <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Signup;

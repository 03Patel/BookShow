import React, { useState, useCallback } from 'react'
import banner from "../../public/banner.webp"
import { useAuth } from '../redux/AuthReducer'
import WelcomeTyping from './Welcome';
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

function Banner() {
    const { authUser } = useAuth();
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // ✅ optimized handler
    const handleClick = useCallback(() => {
        if (email.trim()) {
            navigate("/signup", { state: { email } })
        } else {
            toast.dismiss(); // remove previous toast
            toast.error("Please Enter your email")
        }
    }, [email, navigate]);

    // ✅ optimized input handler
    const handleChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    return (
        <div className='max-w-screen-2xl container mx-auto px-4 sm:px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center md:items-start dark:bg-slate-900 dark:text-white text-gray-800'>

            {/* Text Section */}
            <div className='w-full md:w-1/2 order-2 md:order-1 mt-10 md:mt-32 text-center md:text-left'>
                <div className='space-y-6 md:space-y-12'>

                    {/* ✅ conditional render optimized */}
                    {authUser && (
                        <div className='hidden md:block w-full'>
                            <WelcomeTyping part1="Welcome back" part2={`${authUser.name} 👋`} />
                        </div>
                    )}

                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-snug'>
                        <WelcomeTyping
                            part1="Hello, Welcome here to learn something "
                            part2="new everyday"
                        />
                    </h1>

                    <p className='text-sm sm:text-base md:text-lg'>
                        Step into a universe where every page unlocks a new world, every story shapes a new perspective, and every book becomes a journey you’ll never forget.
                    </p>

                    {/* Input */}
                    <div>
                        <label className="input bg-white dark:bg-slate-900 dark:text-white border w-full border-gray-400 flex items-center gap-2 px-3 py-2 rounded-md">

                            <input
                                type="email"
                                className="grow outline-none text-sm sm:text-base"
                                placeholder="Email"
                                value={email}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>

                <button
                    onClick={handleClick}
                    className="w-full sm:w-auto px-6 mt-6 py-2 bg-pink-500 text-white rounded-md hover:bg-purple-700 transition duration-200"
                >
                    Get Started
                </button>

            </div>

            {/* Image Section */}
            <div className='w-full md:w-1/2 order-1 md:order-2 mt-6 md:mt-0 flex justify-center'>
                <img
                    src={banner}
                    alt="banner"
                    loading="lazy"   // ✅ lazy load
                    className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-auto object-contain rounded-md'
                />
            </div>

        </div>
    )
}

export default React.memo(Banner);
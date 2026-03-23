import React from 'react'
import banner from "../../public/banner.png"

function Banner() {
    return (
        <>
            <div className='max-w-screen-2xl container mx-auto px-4 sm:px-6 md:px-20 flex flex-col dark:bg-slate-900 dark:text-white md:flex-row text-gray-800'>

                {/* Text Section */}
                <div className='w-full md:w-1/2 order-2 md:order-1 mt-10 md:mt-32'>
                    <div className='space-y-6 md:space-y-12'>

                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold leading-snug'>
                            Hello, Welcomes here to learn something{" "}
                            <span className='text-pink-500'>new everyday</span>
                        </h1>

                        <p className='text-sm sm:text-base md:text-lg'>
                            Step into a universe where every page unlocks a new world, every story shapes a new perspective, and every book becomes a journey you’ll never forget.
                        </p>

                        <div>
                            <label className="input bg-white dark:bg-slate-900 dark:text-white border w-full border-gray-400 flex items-center gap-2 px-3 py-2 rounded-md">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow outline-none text-sm sm:text-base"
                                    placeholder="Email"
                                />
                            </label>
                        </div>
                    </div>

                    <button className="w-full sm:w-auto px-6 mt-6 py-2 bg-pink-500 text-white rounded-md hover:bg-purple-700 transition duration-200">
                        Get Started
                    </button>
                </div>

                {/* Image Section */}
                <div className='w-full md:w-1/2 order-1 md:order-2 mt-6 md:mt-0 flex justify-center'>
                    <img
                        src={banner}
                        alt="banner"
                        className='w-full max-w-md md:max-w-full h-auto object-contain rounded-md'
                    />
                </div>
            </div>

            <br />
            <br />
        </>
    )
}

export default Banner
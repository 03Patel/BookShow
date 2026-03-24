import React, { useMemo } from "react";
import { FaBook, FaUsers, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

function AboutSection() {

    // ✅ memoized stats
    const stats = useMemo(() => ([
        { icon: <FaBook className="text-blue-600" />, text: "10,000+ Books" },
        { icon: <FaUsers className="text-blue-600" />, text: "5,000+ Readers" },
        { icon: <FaStar className="text-yellow-400" />, text: "4.9/5 Rating" }
    ]), []);

    return (
        <section className="bg-white dark:bg-slate-900 dark:text-white min-h-screen py-16 px-4">

            <div className="max-w-6xl mt-16 md:mt-40 mx-auto flex flex-col-reverse md:flex-row items-center gap-12">

                {/* TEXT */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
                        About Our Book Store
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300">
                        Welcome to our book world! We connect readers with books they’ll love.
                    </p>

                    <p className="text-gray-600 dark:text-gray-300">
                        Our mission is simple: inspire a love for reading.
                    </p>

                    {/* ✅ Stats */}
                    <div className="flex justify-center md:justify-start gap-6">
                        {stats.map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                {item.icon}
                                <span className="text-gray-600 dark:text-white">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    {/* BUTTON */}
                    <Link to="/course">
                        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                            Explore Books
                        </button>
                    </Link>

                </div>

                {/* IMAGE */}
                <div className="md:w-1/2">
                    <img
                        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=60"
                        alt="Books"
                        loading="lazy" // ✅ important
                        className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                    />
                </div>

            </div>
        </section>
    );
}

export default React.memo(AboutSection);
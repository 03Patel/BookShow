import { FaBook, FaUsers, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AboutSection() {
    return (
        <section className="bg-white dark:bg-slate-900 dark:text-white min-h-screen py-16 px-4">
            <div className="max-w-6xl mt-16 md:mt-40 mx-auto flex flex-col-reverse md:flex-row items-center gap-12">

                {/* Text Section */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2 animate-fadeIn">
                        About Our Book Store
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Welcome to our book world! We connect readers with books they’ll love.
                        From timeless classics to modern bestsellers, we have something for everyone.
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Our mission is simple: inspire a love for reading and make discovering amazing
                        books effortless. Explore genres, get recommendations, and enjoy the joy of reading.
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center md:justify-start gap-6">
                        <div className="flex items-center gap-2">
                            <FaBook className="text-blue-600 " />
                            <span className="text-gray-600 dark:text-white ">10,000+ Books</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUsers className="text-blue-600" />
                            <span className="text-gray-600 dark:text-white">5,000+ Readers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-400" />
                            <span className="text-gray-600 dark:text-white">4.9/5 Rating</span>
                        </div>
                    </div>

                    {/* Button */}
                    <Link to="/course">
                        <button className="mt-6 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition font-medium">
                            Explore Books
                        </button>
                    </Link>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 animate-slideInRight">
                    <img
                        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80"
                        alt="Books"
                        className="rounded-2xl shadow-2xl w-full max-w-full h-auto object-cover"
                    />
                </div>
            </div>
            <br />
        </section>
    );
}
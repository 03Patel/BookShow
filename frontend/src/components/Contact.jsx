import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API request
        setTimeout(() => {
            console.log(form);
            toast.success("Message sent successfully!");
            setForm({ name: "", email: "", message: "" });
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="flex text-gray-800 dark:text-white dark:bg-slate-900 items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white dark:text-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white text-center">
                    Contact Us
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full p-3 border dark:text-white dark:bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                        aria-label="Your Name"
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full p-3 border dark:text-white dark:bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                        aria-label="Your Email"
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Your Message"
                        className="w-full p-3 border dark:text-white dark:bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        required
                        aria-label="Your Message"
                    ></textarea>

                    <button
                        type="submit"
                        className={`w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </div>
    );
}
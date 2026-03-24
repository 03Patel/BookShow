import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        toast.success("Message sent successfully!");

        // reset form
        setForm({ name: "", email: "", message: "" });
    };

    return (
        <div className="flex text-gray-800 dark:text-white dark:bg-slate-900 items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white  dark:text-white dark:bg-slate-800 p-6 rounded-lg shadow-md w-full max-w-md">
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
                        className="w-full p-3 border dark:text-white dark:bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        className="w-full p-3 border dark:text-white dark:bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Your Message"
                        className="w-full p-3 border dark:text-white dark:bg-slate-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}
import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import API from '../api';
import Login from './Login'; // import your Login component
import toast from 'react-hot-toast';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showLogin, setShowLogin] = useState(false); // show/hide login modal
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        try {
            const res = await API.post("/auth/signup", form);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            //  setSuccess(res.data.message);
            toast.success("User create successfull")
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 dark:text-white px-4 text-gray-800">
            <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6">

                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="text-sm">Full Name</label>
                        <div className="relative mt-1">
                            <User className="absolute left-3 top-2 text-gray-500" size={18} />
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full pl-10 py-2 border rounded-md outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm">Email</label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-2 text-gray-500" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full pl-10 py-2 border rounded-md outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm">Password</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-2 text-gray-500" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                className="w-full pl-10 pr-10 py-2 border rounded-md outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-gray-500"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm">Confirm Password</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-2 text-gray-500" size={18} />
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm password"
                                className="w-full pl-10 pr-10 py-2 border rounded-md outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-2 text-gray-500"
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                            >
                                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition"
                    >
                        Sign Up
                    </button>

                </form>

                {/* Redirect to login */}
                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <span
                        onClick={() => setShowLogin(true)}
                        className="text-blue-500 underline cursor-pointer"
                    >
                        Login
                    </span>
                </p>

            </div>

            {/* Render Login Modal */}
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>
    )
}

export default Signup;
import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { Link } from 'react-router-dom'

function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }



        console.log(form); // later connect backend
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 dark:text-white px-4 text-gray-800">

            <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Create Account
                </h2>


                <form onSubmit={handleSubmit} className="space-y-5 te">

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
                                className="w-full pl-10 py-2 border rounded-md outline-none "
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
                                className="w-full pl-10 pr-10 py-2 border rounded-md outline-none "
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-gray-500"
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

                {/* Redirect */}
                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link onClick={() => document.getElementById("my_modal_3").showModal()} className="text-blue-500 underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Signup;
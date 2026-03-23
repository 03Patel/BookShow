import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api'

function Login({ onClose }) {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await API.post("/auth/login", form)
            localStorage.setItem("user", JSON.stringify(res.data.user))

            // Close modal via callback if provided
            if (onClose) onClose()

            navigate("/")
            window.location.reload()
        } catch (error) {
            alert(error.response?.data?.message || "Login failed")
        }
    }

    return (
        <div className="dark:bg-slate-900 dark:text-white bg-white">
            {/* Modal */}
            <dialog className="modal" open>
                <form
                    onSubmit={handleSubmit}
                    className="modal-box w-full max-w-md mx-auto bg-white dark:bg-slate-900 dark:text-white rounded-xl p-6 relative"
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                    >
                        ✕
                    </button>

                    <h3 className="font-bold text-2xl text-center">Login</h3>

                    {/* Email */}
                    <div className="mt-6 space-y-2">
                        <span className="text-sm">Email</span>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full pl-10 py-2 border rounded-md outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mt-4 space-y-2">
                        <span className="text-sm">Password</span>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-2 border rounded-md outline-none"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-500"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-600 transition"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center sm:text-left">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="underline text-blue-500"
                                onClick={onClose}
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </dialog>
        </div>
    )
}

export default Login
import React, { useState, useCallback } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import API from '../api';
import Login from './Login';
import toast from 'react-hot-toast';
import { useAuth } from '../redux/AuthReducer';

function Signup() {

    const location = useLocation();
    const navigate = useNavigate();
    const [, setAuthUser] = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    // ✅ single source of truth
    const [form, setForm] = useState({
        name: "",
        email: location.state?.email || "",
        password: "",
        confirmPassword: ""
    });

    // ✅ optimized change handler
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }, []);

    // ✅ toggle handlers
    const togglePassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const toggleConfirm = useCallback(() => {
        setShowConfirm(prev => !prev);
    }, []);

    // ✅ submit handler
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (loading) return;

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await API.post("/auth/signup", form);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);

            // ✅ update global auth
            setAuthUser(res.data.user);

            toast.success("Signup successful");

            navigate("/"); // ✅ redirect

        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }

    }, [form, loading, navigate, setAuthUser]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 dark:text-white px-4 text-gray-800">

            <div className="w-full max-w-md bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-6">

                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

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
                                className="w-full pl-10 pr-10 py-2 border rounded-md"
                                required
                            />
                            <button type="button" onClick={togglePassword} className="absolute right-3 top-2">
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm */}
                    <div>
                        <label className="text-sm">Confirm Password</label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-2 text-gray-500" size={18} />
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-10 py-2 border rounded-md"
                                required
                            />
                            <button type="button" onClick={toggleConfirm} className="absolute right-3 top-2">
                                {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Sign Up"}
                    </button>

                </form>

                {/* Login redirect */}
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

            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>
    )
}

export default React.memo(Signup);
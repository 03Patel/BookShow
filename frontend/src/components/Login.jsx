import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, FolderMinus } from 'lucide-react'
import { Link } from 'react-router-dom'

function Login() {

    const [show, setShow] = useState(false);

    const [form, setform] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
    }


    return (
        <div className='dark:bg-slate-900 dark:text-white bg-white'>

            {/* Open Button (optional) */}
            <button onClick={() => document.getElementById('my_modal_3').showModal()}>
            </button>

            <dialog id="my_modal_3" className="modal">
                <form onSubmit={handleSubmit} className="modal-box w-full max-w-md mx-auto bg-white dark:bg-slate-900 dark:text-white rounded-xl p-6">

                    {/* Close Button */}
                    <Link to="/" method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
                    </Link>

                    <h3 className="font-bold text-2xl text-center">Login</h3>

                    {/* Email */}
                    <div className='mt-6 space-y-2'>
                        <span className="text-sm">Email</span>
                        <label className='relative block'>
                            <Mail className='absolute left-3 top-3 text-gray-500' size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder='Enter your email'
                                className='w-full pl-10 py-2 border rounded-md outline-none '
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    {/* Password */}
                    <div className='mt-4 space-y-2'>
                        <span className="text-sm">Password</span>
                        <label className='relative block'>
                            <Lock className='absolute left-3 top-3 text-gray-500' size={18} />
                            <input
                                type={show ? "text" : "password"}
                                name='password'
                                placeholder='Enter your password'
                                className='w-full pl-10 pr-10 py-2 border rounded-md outline-none '
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className='absolute right-3 top-3 text-gray-500'
                                onClick={() => setShow(!show)}
                            >
                                {show ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-3 mt-6'>

                        <button className='w-full sm:w-auto bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-600 transition'>
                            Login
                        </button>

                        <p className="text-sm text-center sm:text-left">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className='underline text-blue-500'
                                onClick={() => document.getElementById('my_modal_3').close()}
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
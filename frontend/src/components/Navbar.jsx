import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login';
import { useReducer } from "react";
import { AuthReducer, initialState } from "../redux/AuthReducer";

function Navbar() {


    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const isAuthenticated = !!token;

    useEffect(() => {
        const element = document.documentElement;

        if (theme === "dark") {
            element.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            element.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const [sticky, setSticky] = useState(false)

    const items = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/course">Course</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
        </>
    )

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT" })
        navigate("/")
    }




    return (
        <>
            <div className={`max-w-screen-2xl container mx-auto px-4 sm:px-6 md:px-20  dark:bg-slate-900 dark:text-white fixed top-0 left-0 right-0 z-50
            ${sticky ? "shadow-md bg-white transition-all duration-300" : "bg-white"}`}>

                <div className="navbar bg-white text-gray-800 dark:bg-slate-900 dark:text-white">

                    {/* LEFT */}
                    <div className="navbar-start">

                        {/* Mobile Menu */}
                        <div className="dropdown dark:bg-slate-900 dark:text-white">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-xl dropdown-content dark:text-white dark:bg-gray-900 mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 h-60 border-2">
                                {items}
                            </ul>
                        </div>

                        {/* Logo */}
                        <Link to="/" className='font-bold text-xl sm:text-2xl'>
                            BookShow
                        </Link>
                    </div>

                    {/* CENTER (Desktop Menu) */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {items}
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className='navbar-end items-center gap-2 sm:gap-3'>

                        {/* Search */}
                        <div className='hidden md:flex'>
                            <label className="input dark:bg-slate-900 dark:text-white bg-white border border-gray-400 rounded-md flex items-center gap-2 px-2 py-1">
                                <svg className="h-4 w-4 opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input
                                    type="search"
                                    className="outline-none text-sm w-24 sm:w-40 md:w-48"
                                    placeholder="Search"
                                />
                            </label>
                        </div>

                        {/* Theme Toggle */}
                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" className="theme-controller" value="synthwave" />

                            {/* sun icon */}
                            <svg
                                className="swap-off h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                            >
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>

                        {/* Login Button */}

                        {isAuthenticated ? (
                            <button className='bg-red-500 btn hover:bg-red-600 text-white cursor-pointer'
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => document.getElementById("my_modal_3").showModal()}
                                className="btn btn-sm sm:btn-md">
                                Login
                            </button>
                        )}
                        <Login />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
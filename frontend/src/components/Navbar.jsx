import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useAuth } from '../redux/AuthReducer'

function Navbar() {

    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light")
    const { authUser, setAuthUser } = useAuth();
    const [sticky, setSticky] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const navigate = useNavigate()

    // ✅ Memo menu items
    const items = useMemo(() => (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/course">Course</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
        </>
    ), [])

    // ✅ Theme effect
    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle("dark", theme === "dark")
        localStorage.setItem("theme", theme)
    }, [theme])

    // ✅ Optimized scroll (throttle)
    useEffect(() => {
        let timeout = null

        const handleScroll = () => {
            if (timeout) return
            timeout = setTimeout(() => {
                setSticky(window.scrollY > 0)
                timeout = null
            }, 100)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // ✅ Logout
    const handleLogout = useCallback(() => {
        setAuthUser(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        navigate("/")
    }, [navigate, setAuthUser])




    return (
        <div className={`max-w-screen-2xl container mx-auto px-4 sm:px-6 md:px-20 fixed top-0 left-0 right-0 z-50 transition-all duration-300
            ${sticky ? "shadow-md" : ""}
            ${theme === "dark" ? "bg-slate-900" : "bg-white"}`}>

            <div className="navbar text-gray-800 dark:text-white">

                {/* LEFT */}
                <div className="navbar-start">

                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            ☰
                        </div>

                        <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-900 rounded-box w-52 max-h-60 overflow-auto border-2">
                            {items}
                        </ul>
                    </div>

                    <Link to="/" className='font-bold text-xl sm:text-2xl'>
                        BookShow
                    </Link>
                </div>

                {/* CENTER */}
                <div className='navbar-end'>
                    <div className="navbar-end hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {items}
                        </ul>
                    </div>

                    {/* RIGHT */}
                    <div className='items-center gap-2 sm:gap-3'>
                        {/* Auth */}
                        {authUser ? (
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                            >
                                Logout
                            </button>
                        ) : (
                            <button
                                onClick={() => setModalVisible(true)}
                                className="btn btn-sm sm:btn-md"
                            >
                                Login
                            </button>
                        )}

                    </div>
                </div>

                {/* ✅ Modal outside main render */}
                {modalVisible && (
                    <Login onClose={() => setModalVisible(false)} />
                )}

            </div>
        </div>
    )
}

export default React.memo(Navbar)
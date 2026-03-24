import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import API from '../api'
import toast from 'react-hot-toast'
import { useAuth } from '../redux/AuthReducer'

function BookDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { isFree } = location.state || {}

    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authUser] = useAuth()

    useEffect(() => {
        const getBook = async () => {
            try {
                setLoading(true)
                const endpoint = authUser ? `/products/user/${id}` : `/book/user/${id}`
                const res = await API.get(endpoint)
                setBook(res.data)
            } catch (error) {
                toast.error(error.response?.data?.message || error.message || "Failed to fetch book")
            } finally {
                setLoading(false)
            }
        }

        if (id) getBook()
    }, [id, authUser])

    const handleBuy = () => {
        navigate(`/checkout/${book._id}`, { state: { isFree: book.free } })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        )
    }

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Book not found</h2>
                    <Link to="/" className="text-pink-500 hover:underline">
                        Go back
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen dark:bg-slate-900 dark:text-white bg-gray-100 py-10 px-4 flex justify-center">
            <div className="w-full max-w-5xl mt-10 text-gray-800 dark:text-white bg-white dark:bg-gray-800 border rounded-xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* IMAGE */}
                    <div className="bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-4">
                        <img
                            src={book.image}
                            alt={book.name}
                            loading="lazy"
                            className="w-full max-h-[350px] md:max-h-[450px] object-contain rounded-md"
                        />
                    </div>

                    {/* DETAILS */}
                    <div className="p-6 flex flex-col justify-between">

                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
                                {book.name}
                            </h1>

                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-sm text-gray-500 dark:text-gray-300">{book.category}</span>

                                <span className={`text-xs px-2 py-1 rounded 
                                    ${book.free
                                        ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300"
                                        : "bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-300"}`}>
                                    {book.free ? "Free" : "Paid"}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                                {book.title || "No description available"}
                            </p>

                            <div className="text-2xl font-bold text-gray-900 dark:text-white" aria-live="polite">
                                ${book.price}
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleBuy}
                                aria-label={`Buy ${book.name}`}
                                className="w-full sm:w-auto px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
                            >
                                Buy Now
                            </button>

                            <Link
                                to={authUser ? "/course" : "/"}
                                className="w-full sm:w-auto px-6 py-2 border rounded-md text-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                            >
                                Back
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails
import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import API from '../api'
import toast from 'react-hot-toast'
import { useAuth } from '../redux/AuthReducer'

function BookReceipt() {
    const { id } = useParams()
    const location = useLocation()
    const { payment = {}, userDetails = {} } = location.state || {}

    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const { authUser, isFree } = useAuth()

    useEffect(() => {
        const getBook = async () => {
            try {
                setLoading(true)
                const endpoint = !isFree ? `/products/user/${id}` : `/book/user/${id}`
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
                <p className="text-xl font-semibold">Loading receipt...</p>
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
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex justify-center items-start py-10 px-4 text-gray-800 dark:text-white">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 mt-20 border rounded-lg shadow-sm">

                {/* Header */}
                <div className="border-b px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Receipt</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>

                {/* Content */}
                <div className="px-6 py-5 space-y-6">

                    {/* Buyer Info */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Buyer</h3>
                        <p className="text-sm">{userDetails.name || "N/A"}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{userDetails.email || "N/A"}</p>
                    </div>

                    {/* Product Info */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Product</h3>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">{book?.name || "N/A"}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{book?.category || "N/A"}</p>
                            </div>
                            <p className="text-sm font-semibold">${book?.price || 0}</p>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment</h3>
                        <div className="text-sm space-y-1">
                            <p>ID: {payment?.id || "N/A"}</p>
                            <p>Method: {payment?.method || "N/A"}</p>
                            <p className="flex items-center gap-2">
                                Status:
                                <span className={`px-2 py-0.5 text-xs rounded 
                                    ${payment?.status === "Success"
                                        ? "bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300"
                                        : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300"}`}>
                                    {payment?.status || "Success"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 flex justify-between gap-3">
                    <Link to="/" className="text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
                        Home
                    </Link>
                    <button onClick={() => window.print()} className="text-sm px-4 py-1.5 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
                        Print
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookReceipt
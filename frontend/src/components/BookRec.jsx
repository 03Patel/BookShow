import React, { useEffect, useState } from 'react'
import { useLocation, Link, useParams } from 'react-router-dom'
import API from '../api'
import toast from 'react-hot-toast'
import { useAuth } from '../redux/AuthReducer'

function BookReceipt() {
    const { id } = useParams()
    const location = useLocation()
    const { payment, userDetails, isFree } = location.state || {}

    const [books, setBook] = useState(null)
    const [authUser, setAuthUser] = useAuth()


    useEffect(() => {
        const getBook = async () => {
            try {
                let res;

                if (!authUser) {
                    res = await API.get(`/book/user/${id}`)
                } else {
                    res = await API.get(`/products/user/${id}`)
                }

                setBook(res.data)


            } catch (error) {
                toast.error(error.message)
            }
        }

        if (id) getBook()

    }, [id, isFree])




    return (
        <div className="min-h-screen  text-gray-800 dark:bg-slate-900 dark:text-white bg-gray-100 flex justify-center items-start py-10 px-4">

            <div className="w-full max-w-xl bg-white mt-40 border rounded-lg shadow-sm">

                {/* Header */}
                <div className="border-b px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Receipt</h2>
                    <span className="text-sm text-gray-500">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>

                {/* Content */}
                <div className="px-6 py-5 space-y-6">

                    {/* Buyer */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Buyer
                        </h3>
                        <p className="text-sm">{userDetails.name}</p>
                        <p className="text-sm text-gray-600">{userDetails.email}</p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Product
                        </h3>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">{books?.name}</p>
                                <p className="text-xs text-gray-500">{books?.category}</p>
                            </div>
                            <p className="text-sm font-semibold">
                                ${books?.price}
                            </p>
                        </div>
                    </div>

                    {/* Payment */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">
                            Payment
                        </h3>
                        <div className="text-sm space-y-1">
                            <p>ID: {payment?.id || "N/A"}</p>
                            <p>Method: {payment?.method || "N/A"}</p>
                            <p className="flex items-center gap-2">
                                Status:
                                <span className={`px-2 py-0.5 text-xs rounded 
                                    ${payment?.status === "Success"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-gray-200 text-gray-600"}`}>
                                    {payment?.status || "Success"}
                                </span>
                            </p>
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 flex justify-between gap-3">

                    <Link
                        to={`/checkout/${id}`}
                        className="text-sm text-gray-600 hover:text-black"
                    >
                        ← Back
                    </Link>

                    <button
                        onClick={() => window.print()}
                        className="text-sm px-4 py-1.5 border rounded hover:bg-gray-100"
                    >
                        Print
                    </button>

                </div>

            </div>
        </div>
    )
}

export default BookReceipt
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import API from '../api'
import toast from 'react-hot-toast'
import { useAuth } from '../redux/AuthReducer'

function Checkout() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { isFree } = location.state || {}

    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(true)
    const [authUser] = useAuth()

    const [form, setForm] = useState({
        name: authUser?.name || "",
        email: authUser?.email || "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true)
                const endpoint = authUser ? `/products/user/${id}` : `/book/user/${id}`
                const res = await API.get(endpoint)
                setBook(res.data)
            } catch (error) {
                toast.error("Failed to load product")
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchBook()
    }, [id, authUser])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name || !form.email || !form.phone || !form.address) {
            toast.error("Please fill all details")
            return
        }

        // simulate payment
        const payment = {
            id: "PAY_" + Date.now(),
            method: "UPI",
            status: "Success"
        }

        navigate(`/BookReceipt/${id}`, {
            state: {
                isFree,
                payment,
                userDetails: form
            }
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
                <p className="text-lg font-medium">Loading checkout...</p>
            </div>
        )
    }

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 text-gray-800 dark:text-white">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Book not found</h2>
                    <Link to="/" className="text-pink-500 hover:underline">Go back</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-900 dark:text-white text-gray-800 py-10 px-4 flex justify-center">
            <div className="w-full max-w-5xl mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT - FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border space-y-4"
                >
                    <h2 className="text-xl font-semibold mb-4">Checkout</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
                    >
                        Proceed to Payment
                    </button>

                    <Link
                        to={`/Details/${id}`}
                        className="inline-block mt-2 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                    >
                        ← Back
                    </Link>
                </form>

                {/* RIGHT - ORDER SUMMARY */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="flex gap-4">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="w-24 h-24 object-cover rounded"
                            loading="lazy"
                        />
                        <div>
                            <p className="font-medium">{book.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{book.category}</p>
                            <p className="text-lg font-semibold mt-2">${book.price}</p>
                        </div>
                    </div>

                    <div className="mt-6 border-t pt-4 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${book.price}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
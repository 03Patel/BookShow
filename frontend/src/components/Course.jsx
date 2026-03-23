import React, { useEffect, useState, useCallback } from 'react'
import Card from './Card'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import API from '../api'
import { useAuth } from '../redux/AuthReducer'
import WelcomeTyping from './Welcome'

function Course() {
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [authUser] = useAuth()
    const limit = 12 // items per fetch

    const getProducts = useCallback(async () => {
        if (!hasMore) return
        setLoading(true)
        try {
            const res = await API.get(`/products?page=${page}&limit=${limit}`)
            if (res.data.length < limit) setHasMore(false)
            setProducts(prev => [...prev, ...res.data])
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }, [page, hasMore])

    useEffect(() => {
        getProducts()
    }, [getProducts])

    // Infinite scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && hasMore) {
                setPage(prev => prev + 1)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [loading, hasMore])

    return (
        <div className='max-w-screen-2xl bg-white dark:bg-slate-900 dark:text-white min-h-screen container mx-auto md:px-20 px-4'>
            <div className='flex flex-col  items-center text-center mt-16 text-gray-800 dark:text-white'>
                <h1 className='text-2xl mt-20 md:text-4xl'>
                    <WelcomeTyping
                        part1="We're delighted to have you"
                        part2="Here :)"
                    />
                </h1>
                <p className='mt-6 max-w-2xl'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti magnam nesciunt animi molestias quis sint asperiores beatae consequuntur natus, iure, ipsam ullam. Distinctio, necessitatibus? Quos animi ullam perferendis facilis adipisci.
                </p>

                <Link to="/">
                    <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
                        Back
                    </button>
                </Link>

                <div className='mt-12 w-full'>
                    {authUser ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                            {products.map((item) => (
                                <MemoCard item={item} key={item.id} />
                            ))}
                        </div>
                    ) : (
                        <GuestCTA />
                    )}

                    {loading && (
                        <p className="text-gray-500 mt-6 text-center">Loading more products...</p>
                    )}

                    {!hasMore && products.length > 0 && (
                        <p className="text-gray-500 mt-6 text-center">No more products</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    )
}

// Memoized Card for performance
const MemoCard = React.memo(Card)

// Guest view component
const GuestCTA = () => (
    <div className='flex flex-col items-center justify-center text-center'>
        <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            className="w-28 mb-4 opacity-80"
            alt="Locked"
        />
        <h2 className="text-2xl font-semibold mb-2">Unlock All Books</h2>
        <p className="text-gray-500 mb-6 max-w-sm">
            Create an account to explore, save, and purchase your favorite books.
        </p>
        <Link
            to="/signup"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
            Get Started
        </Link>
    </div>
)

export default Course
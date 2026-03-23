import React, { useEffect, useState } from 'react'
import Card from './Card';
import Footer from './Footer';
import { Link } from "react-router-dom";
import API from "../api"
import { useAuth } from '../redux/AuthReducer';
import WelcomeTyping from './Welcome';

function Course() {
    const [product, setProducts] = useState([]);
    const [authUser, setAuthUser] = useAuth();

    const getproduct = async () => {
        try {
            const res = await API.get("/products");
            setProducts(res.data);


        } catch (error) {
            console.log(error)

        }
    }




    useEffect(() => {
        getproduct();
    }, [])

    return (
        <>
            <div className='max-w-screen-2xl bg-white dark:bg-slate-900 dark:text-white h-[100%] container mx-auto md:px-20 px-4 '>
                <div className=' items-center dark:bg-slate-900 dark:text-white text-gray-800 justify-center text-center '>
                    <h1 className='text-2xl  dark:text-white md:test-4xl'>
                        <br /><br /><br />
                        <WelcomeTyping
                            part1="We're delighted to have you"
                            part2="Here :)"
                        />


                    </h1>
                    <p className='mt-10'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti magnam nesciunt animi molestias quis sint asperiores beatae consequuntur natus, iure, ipsam ullam. Distinctio, necessitatibus? Quos animi ullam perferendis facilis adipisci.
                    </p>

                    <Link to="/">
                        <button className=' mt-10 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>

                    </Link>
                    <div className='mt-12'>
                        {
                            authUser ? (
                                <div className='mt-12 grid gird-cols-1 md:grid-cols-4'>
                                    {product.map((item) => (
                                        <Card item={item} key={item.id} />

                                    ))}
                                </div>
                            ) : (
                                <div className=''>
                                    <div className="flex flex-col items-center justify-center  text-center ">

                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                            className="w-28 mb-4 opacity-80"
                                        />

                                        <h2 className="text-2xl font-semibold mb-2">
                                            Unlock All Books
                                        </h2>

                                        <p className="text-gray-500 mb-6 max-w-sm">
                                            Create an account to explore, save and purchase your favorite books.
                                        </p>

                                        <Link
                                            to="/signup"
                                            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>


                </div>
                <br />
                <br />
                <Footer />
            </div>
        </>
    )
}

export default Course
import React from 'react'
import Card from './Card';
import Footer from './Footer';
import { Link } from "react-router-dom";
function Course() {


    const filterBook = list.filter((data) => data.free === true);

    return (
        <>
            <div className='max-w-screen-2xl bg-white dark:bg-slate-900 dark:text-white h-[100%] container mx-auto md:px-20 px-4 '>
                <div className=' items-center dark:bg-slate-900 dark:text-white text-gray-800 justify-center text-center '>
                    <h1 className='text-2xl  md:test-4xl'>
                        <br /><br /><br />
                        We're delighted to have you {" "}
                        <span className='text-pink-500'>Here :)</span>
                    </h1>
                    <p className='mt-10'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti magnam nesciunt animi molestias quis sint asperiores beatae consequuntur natus, iure, ipsam ullam. Distinctio, necessitatibus? Quos animi ullam perferendis facilis adipisci.
                    </p>

                    <Link to="/">
                        <button className=' mt-10 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>Back</button>

                    </Link>
                    <div className='mt-12 grid gird-cols-1 md:grid-cols-4'>
                        {filterBook.map((item) => (
                            <Card item={item} key={item.id} />
                        ))}
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
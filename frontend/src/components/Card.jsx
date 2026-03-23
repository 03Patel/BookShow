import React from 'react'
import image from "../../public/image.png"

function Card({ item }) {
    return (
        <div className='mt-6 sm:mt-10 px-2 sm:px-3'>

            <div className="w-full dark:bg-slate-900 dark:text-white dark:border sm:max-w-sm md:max-w-md bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 overflow-hidden group">

                {/* IMAGE */}
                <div className="w-full h-48 sm:h-56 overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                </div>

                {/* BODY */}
                <div className="p-4  dark:bg-slate-900 dark:text-white sm:p-5 space-y-3">

                    {/* TITLE + BADGE */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-base sm:text-lg font-semibold line-clamp-1">
                            {item.name}
                        </h2>

                        <span className={`text-xs px-2 py-1 rounded-md text-white 
                            ${item.free ? "bg-green-500" : "bg-purple-600"}`}>
                            {item.free ? "Free" : "Paid"}
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    <div className='flex justify-between dark:bg-slate-900 dark:text-white text-xs sm:text-sm text-gray-600'>
                        <p className="line-clamp-2 w-[65%]">
                            {item.title}
                        </p>
                        <p className="text-right w-[30%]">
                            {item.category}
                        </p>
                    </div>

                    {/* PRICE + BUTTON */}
                    <div className="flex items-center dark:bg-slate-900 dark:text-white justify-between pt-2">
                        <span className="border dark:bg-slate-900 dark:text-white text-gray-700 text-xs sm:text-sm px-3 py-1 rounded-md font-medium">
                            ₹ {item.price}
                        </span>

                        <button className="text-xs sm:text-sm px-3 py-1 rounded-full border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-300">
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../redux/AuthReducer';


function Card({ item }) {
    const { isFree, setIsFree } = useAuth()

    const navigate = useNavigate();

    // ✅ memoized handler
    const handleBuy = useCallback(() => {
        navigate(`/Details/${item._id}`, {
            state: {
                state: item.free
            }
        });
        setIsFree(item.free)
    }, [navigate, item]);

    // ✅ memoized badge class
    const badgeClass = useMemo(() => {
        return item.free ? "bg-green-500" : "bg-purple-600";
    }, [item.free]);

    return (
        <div className='mt-6 sm:mt-10 px-2 sm:px-3'>

            <div className="w-full dark:bg-slate-900 dark:text-white dark:border sm:max-w-sm md:max-w-md bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 overflow-hidden group">

                {/* IMAGE */}
                <div className="w-full overflow-hidden aspect-[3/2]">
                    <img
                        src={item.image}
                        alt={item.name}
                        srcSet={`
                           ${item.image}?w=300 300w,
                           ${item.image}?w=600 600w,
                           ${item.image}?w=900 900w
                        `}
                        sizes="(max-width: 768px) 100vw, 33vw"
                        loading="lazy"  // ✅ important
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                </div>

                {/* BODY */}
                <div className="p-4 sm:p-5 space-y-3">

                    {/* TITLE + BADGE */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-base sm:text-lg font-semibold line-clamp-1">
                            {item.name}
                        </h2>

                        <span className={`text-xs px-2 py-1 rounded-md text-white ${badgeClass}`}>
                            {item.free ? "Free" : "Paid"}
                        </span>
                    </div>

                    {/* DESCRIPTION */}
                    <div className='flex justify-between text-xs sm:text-sm text-gray-600 flex-wrap gap-2'>
                        <p className="flex-1 truncate">{item.title}</p>
                        <p className="flex-none">{item.category}</p>
                    </div>

                    {/* PRICE + BUTTON */}
                    <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                        <span className="border dark:bg-slate-900 dark:text-white text-gray-700 text-xs sm:text-sm px-3 py-1 rounded-md font-medium">
                            $ {item.price}
                        </span>

                        <button
                            onClick={handleBuy}
                            className="text-xs sm:text-sm px-3 py-1 rounded-full border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition duration-300"
                        >
                            Buy Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

// ✅ most important
export default React.memo(Card);
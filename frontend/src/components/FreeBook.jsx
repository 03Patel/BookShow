import React, { useEffect, useState, useMemo } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Card from './Card';
import API from '../api';
import toast from 'react-hot-toast';


function FreeBook() {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(true);


    // ✅ Fetch books
    useEffect(() => {
        const getBook = async () => {
            try {
                const res = await API.get("/book");
                setBook(res.data);
            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to fetch books");
            } finally {
                setLoading(false);
            }
        };
        getBook();
    }, []);

    // ✅ Slider settings optimized
    const settings = useMemo(() => ({
        infinite: true,
        slidesToShow: window.innerWidth < 768 ? 1 : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 800,
        cssEase: "ease-in-out",
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            }
        ]
    }), []);

    return (
        <div className='max-w-screen-2xl dark:bg-slate-900 dark:text-white container mx-auto text-gray-800 md:px-20 px-4'>

            <div>
                <h1 className='font-semibold text-xl p-2'>Free Offer Books</h1>
                <p className='text-gray-500 p-2'>
                    Unlock worlds, gain knowledge, and explore freely.
                </p>
            </div>

            {loading ? (
                <div className="flex gap-4 overflow-x-auto py-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-60 h-72 bg-gray-300 rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : (
                <Slider {...settings}>
                    {book.map((item) => (
                        <Card item={item} key={item.id} />
                    ))}
                </Slider>
            )}
        </div>
    );
}

export default React.memo(FreeBook);
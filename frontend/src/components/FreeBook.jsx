import React, { useEffect, useMemo, useState } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Card from './Card';
import API from '../api';

function FreeBook() {

    const [screenWidth, setScreenWidth] = useState(0);
    const [book, setBook] = useState([]);

    useEffect(() => {
        const updateWidth = () => {
            setScreenWidth(window.innerWidth);
        };

        updateWidth(); // run on load
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const getBook = async () => {
        try {
            const book = await API.get("/book");
            setBook(book.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getBook();
    })

    const settings = {
        infinite: true,
        slidesToShow: screenWidth < 768 ? 1 : 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 800,
        cssEase: "ease-in-out",
        arrows: false,
    };

    return (
        <div className='max-w-screen-2xl dark:bg-slate-900 dark:text-white container mx-auto text-gray-800 md:px-20 px-4'>

            <div>
                <h1 className='font-semibold text-xl p-2'>Free Offer Books</h1>
                <p className='text-gray-500 p-2'>
                    “Unlock worlds, gain knowledge, and explore freely — because the best books cost nothing.”
                </p>
            </div>

            <Slider key={screenWidth} {...settings}>
                {book.map((item) => (
                    <Card item={item} key={item.id} />
                ))}
            </Slider>

        </div>
    )
}

export default FreeBook;
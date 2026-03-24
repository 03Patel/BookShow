import React from 'react'
import Banner from './Banner'
import Footer from './Footer'
import FreeBook from './FreeBook'


function Home() {
    return (
        <div className='h-full w-full bg-white dark:bg-slate-900 dark:text-white'>
            <Banner />
            <FreeBook />
            <br /><br />
            <Footer />

        </div>
    )
}

export default Home
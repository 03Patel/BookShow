import React, { Suspense } from 'react';

const Banner = React.lazy(() => import('./Banner'));
const FreeBook = React.lazy(() => import('./FreeBook'));
const Footer = React.lazy(() => import('./Footer'));

function Home() {
    return (
        <div className='min-h-screen w-full bg-white dark:bg-slate-900 dark:text-white'>

            <Suspense fallback={<div>Loading...</div>}>
                <Banner />
                <FreeBook />
                <div className="mt-10">
                    <Footer />
                </div>
            </Suspense>

        </div>
    )
}

export default React.memo(Home);
 
import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import {getCategories} from '../serveces/index'
import {Categories} from '../components/components-type'
const Header = () => {
      const [categories, setCategories] = useState <Categories[]>([])

    useEffect(() => {

        getCategories().then((newCategories) => setCategories(newCategories))

    }, []);
    return (
        <div className="container mx-auto px-10 mb-8 mix-blend-overlay relative">

            <div className="border-b w-full inline-block border-blue-400 py-8">
                <div className="md:float-left block">
                    <Link href="/">
                        <span className="cursor-pointer font-bold text-4xl text-white">
                            GraphCMS
                        </span>
                    </Link>
                </div>
                <div className='hidden md:float-left md:contents'>

                    {
                    categories.map((category, index) => (
                            <Link key={index}
                            href={`/category/${category.slug}`}>
                                <span className='md:float-right mt-2 align-middle text-white text-2xl ml-4 font-semibold  
                                 cursor-pointer'>
                                    {
                                    category.name
                                } </span>
                            </Link>
                        )
                    )
                } </div>
            </div>
        </div>
    )
}

export default Header

'use client'
import {GetStaticProps, InferGetStaticPropsType} from 'next'
// import useSWR from 'swr'
import {FeaturedPosts} from '../sections/featuredPosts'

import {getPosts } from '../serveces/index'
// import {Inter} from 'next/font/google'
import Head from 'next/head'
import bgimg from './bg.png'
import Image from 'next/image'
// import {PodtCard, Categories, PostWidget} from '../components/index'
import {PostCard} from '../components/index'
import Categories from '../components/Categories'
import PostWidget from '../components/PostWidget'
import {useState} from 'react'
import { Posts } from '../components/components-type'
 
interface Props {
    posts: Posts[];
} 
export default function Home({posts} : Props) {
 
    return (
        <>
            <div className="w-full    mx-auto ">

                <div className='container relative mx-auto px-10 mb-8     '>
                    <Head>
                        <title>CMS Blog</title>
                        <link rel="icon" href="/favicon.ico"/>
                    </Head>
                    <FeaturedPosts/>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className=" lg:col-span-8 col-span-1">
                            {
                            posts.map((post, index) => <PostCard key={index}
                                post={
                                    post
                                }/>)
                        }
                         
                        
                        </div>
                        <div className="lg:col-span-4 col-span-1">
                            <div className="lg:sticky relative top-8">
                                <PostWidget  />
                                <Categories/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export const getStaticProps = async () => {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
};
 

/* eslint-disable @next/next/no-img-element */
import moment from 'moment';
  
import React, { FC, Fragment } from "react";


import Link from "next/link";
import { Posts } from './components-type';


 
  interface Props {
  post: Posts; 
}
const PostCard : FC<Props>= ({post}) => { 
      const postData = post.node;
    
    return ( 
      <div className="bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8">
                  <div className="relative overflow-hidden shadow-md pb-80 mb-6"> 
         
          <img 
            src={postData.featuredImage.url}
            alt=""
            className="object-top   absolute h-80 w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
          />
            </div>

            <h1 className="  transaition duration-700 text-center mb-6 cursore-pointer
            hover:text-pink-600 md:text-4xl text-xl font-semibold
            ">
<Link href={`/post/${postData.slug}`}>
  {postData.title}
</Link>
            </h1>
            <div className="block lg:flex text-center items-center justify-center mb-8 w-full">
            <div className="flex  justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
           
            <img
         
                className="align-middle rounded-full h-14 w-14"
              
                src={postData.author.photo.url}  alt={postData.author.name} />
                  <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{postData.author.name}</p>
            </div>

            <div className="text-md md:text-xl font-normal text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="md:h-8 h-6 w-10 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="align-middle text-md md:text-xl">{moment(postData.createdAt).format('MMM DD, YYYY')}</span>
      </div>  </div>
       <p className="text-center md:text-xl mx-auto text-gray-700 font-normal px-4 lg:px-20 mb-8">
      {postData.excerpt}
    </p>
      <div className="text-center">
      <Link href={`/post/${postData.slug}`}>
        <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-600 md:text-xl text-md font-medium rounded-full text-white px-8 py-3 cursor-pointer">Continue Reading</span>
      </Link>
    </div>
           


            </div>  
   )
}
 
export default PostCard

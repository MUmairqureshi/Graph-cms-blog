'use client'
import React, { FC, useEffect, useState } from 'react'
import {Post} from './components-type'
import {getRecentPosts , getSimilarPosts } from '../serveces/index'

interface  Props{
  slug?: string;
  categories?: string[];
}
import moment from 'moment';
import Link from 'next/link';
const PostWidgey : FC<Props>  = ({ categories , slug}) => {
  const [relatedPosts , setRelatedPosts] = useState<Post[]>([])
 



  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug ).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);
  console.log(relatedPosts)
  return (
 
  <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="md:text-2xl  text-xl  mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="   mb-4 flex-none">
            <img

              alt={post.title}
 
              className="align-middle md:h-16 md:w-16 w-10 h-10 rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 md:text-xl ">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
            <Link href={`/post/${post.slug}`} className="md:text-2xl" key={index}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidgey




export const getStaticProps = async () => {
  const recentPosts = (await getRecentPosts()) || [];
  return {
    props: recentPosts,
  };
};





























// // /* eslint-disable @next/next/no-img-element */
// // /* eslint-disable react/jsx-no-comment-textnodes */
// // import React, { FC, useEffect, useState } from 'react'
// import {Post} from './components-type'
// // import {getRecentPosts , getSimilarPosts } from '../serveces/index'


// import React, { useState, useEffect, FC } from "react";
// import Image from "next/image";
// import moment from "moment";
// import Link from "next/link";
// import { getRecentPosts, getSimilarPosts } from '../serveces/index'
// // import { IPost, ICategories } from "../../interfaces";

// // import { grpahCMSImageLoader } from '../util';
// // import { getSimilarPosts, getRecentPosts } from '../services';

// interface IProps {
//   slug?: string;
//   categories: string[];
// }

// const PostWidget = ({ categories, slug } : IProps) => {
//   const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     if (slug) {
//       getSimilarPosts(categories, slug).then((result) => {
//         setRelatedPosts(result);
//       });
//     } else {
//       getRecentPosts().then((result) => {
//         setRelatedPosts(result);
//       });
//     }
//   }, [slug]);

//   return (
//     <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
//       <h3 className="text-xl mb-8 font-semibold border-b pb-4">
//         {slug ? "Related Posts" : "Recent Posts"}
//       </h3>
//       {relatedPosts.map((post, index) => (
//         <div key={index} className="flex items-center w-full mb-4">
//           <div className="w-16 flex-none">
//             {/* <Image
//               // loader={grpahCMSImageLoader}
//               alt={post.title}
//               height="60px"
//               width="60px"
//               unoptimized
//               className="align-middle rounded-full"
//               src={post.featuredImage.url}
//             /> */}


// <img

//               alt={post.title}
 
//               className="align-middle md:h-16 md:w-16 w-10 h-10 rounded-full"
//               src={post.featuredImage.url}
//             />          </div>
//           <div className="flex-grow ml-4">
//             <p className="text-gray-500 font-xs">
//               {moment(post.createdAt).format("MMM DD, YYYY")}
//             </p>
//             <Link href={`/post/${post.slug}`} key={index}>
//               <a className="text-md"> {post.title}</a>
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PostWidget;

// export const getStaticProps = async () => {
//   const recentPosts = (await getRecentPosts()) || [];
//   return {
//     props: recentPosts,
//   };
// };







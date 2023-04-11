/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { FC } from 'react'

import {Author} from './components-type'
interface Props {
  author: Author; 
}
 const Author : FC<Props> = ({author}) => {
  return (
    <div className=" mx-auto mt-20 mb-8 p-12 relative text-center rounded-lg bg-black bg-opacity-20">
    <div className="absolute justify-center    right-0.5 left-0.5   mx-auto  -top-14">
      <img
        alt={author.name}
        className=" h-[100px] w-[100px]  mx-auto    rounded-full"
        src={author.photo.url}
      />
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-ls">{author.bio}</p>
  </div>
  )
}
export default Author
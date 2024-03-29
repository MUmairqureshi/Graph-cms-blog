import React, {useEffect, useState} from 'react'
import moment from 'moment'
// import parse from 'react-html-parser';
import {Comment} from './components-type'
import {getComments} from '../services/index'
import {comment} from 'postcss'
interface slgtype {
    slug : string;
    
}
const Comment = ({slug}:slgtype) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        getComments(slug).then((result) => {
         setComments(result)})
    }, )
    return (
        <> {
            comment.length > 0 && (
                <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
                    <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                        {
                        comments.length
                    }
                        {' '}
                        Comments
                    </h3>
                    {
                    comments.map((comment) => (
                        <div key={
                                comment.createdAt
                            }
                            className='border-b border-gra-100 mb-4 pb-4'>
                            <p className='mb-4'>
                                <span className='font-semibold'>
                                    {
                                    comment.name
                                } </span>
                                {' '}on {' '}
                                {
                                moment(comment.createdAt).format('MMM DD, YY')
                            } </p>
                            <p className='whitespace-pre-line text-gray-600 w-full'>
                                {
                                (comment.comment)
                            } </p>
                        </div>
                    ))
                }
                    
                </div>
            )
        } </>
    )
}
export default Comment

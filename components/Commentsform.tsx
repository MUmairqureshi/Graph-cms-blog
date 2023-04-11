import React, {useEffect, useState} from 'react'
import {submitComment} from '../serveces/index'
type formdata = {
    name: string,
    email: string,
    comment?: string,
    storeData: boolean

}
const data: formdata = {
    name: "",
    email: "",
    comment: "",
    storeData: false
}
const Commentsform = ({slug}:any) => {
    const [error, setError] = useState(false)
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [formdata, setFormData] = useState < formdata > ({data})

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email') ? true : false,
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {

      setFormData((prevState) => {
        return {
          ...prevState,
          [target.name]: target.checked,
        }
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };


    const handleCommentSubmission = () => { 
        setError(false)
        const { name, email, comment, storeData } = formdata;
        if (!comment || !name || !email) {
            setError(true);
            return; 
         }
        const commentObj = {
            name ,
            email,
            comment,
            slug
        };
        if (storeData) {
            window.localStorage.setItem('name', name)
            window.localStorage.setItem('email', email)
        } else {
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('email')
        }
        submitComment(commentObj)
        .then((res) => {
            if(res.createComment){
                if(!storeData){
         formdata.name = ' ' ;
         formdata.email = ' ' ;
            }
            formdata.comment = '';
           
                setFormData((prevState) =>({
                    ...prevState,
                    ...formdata
                }))
            
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }})
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="md:text-2xl text-xl mb-8 font-semibold border-b pb-4">Leave a Reply</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <textarea className="p-4 text-xl outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                   value={formdata.comment} 
                    onChange={onInputChange}
                    name="comment"
                    placeholder="Comment"/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input type="text"
                  value={formdata.name} 
                     onChange={onInputChange}
                    className="md:py-4 py-2 md:text-xl px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"
                    placeholder="Name"
                    name="name"/>
                <input type="email" className="md:py-4 py-2 md:text-xl px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email"
                    onChange={ e => e.target.value  }
                     value={formdata.email} 
                     />
            </div>
            <div className="grid grid-cols-1 gap-6 mb-4">
                <div>
                    <input 
                   onChange={onInputChange}
                        type="checkbox"
                      
                        id="storeData"
                        name="storeData"
                        className='md:h-4 md:w-4'
                        value="true"/>
                    <label className="text-gray-500 md:text-xl ml-4 cursor-pointer " htmlFor="storeData">
                        Save my name, email in this browser for the next time I comment.</label>
                </div>
            </div>
            {
            error && <p className="text-xs text-red-500">All fields are mandatory</p>
        }
            <div className="mt-8">
                <button type="button"
                    onClick={handleCommentSubmission}
                    className="transition duration-500 ease hover:bg-indigo-900   bg-pink-600 md:text-lg flex font-medium rounded-full text-white px-8 py-3 cursor-pointer">Post Comment</button>
                {
                showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>
            } </div>
        </div>
    )
}
export default Commentsform

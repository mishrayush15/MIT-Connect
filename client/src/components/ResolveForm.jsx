import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


const ResolveForm = ({close, post}) => {

    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        try{
            const resolve = await axios.post(`http://localhost:3000/post/resolve/${post.user}`, data, {
                withCredentials: true
            })
            const deletePost = await axios.get(`http://localhost:3000/post/delete/${post._id}`, {
                withCredentials: true
            })
            window.location.reload();        
        }catch(error){
            navigate('/requestedposts')
        }
        
        
        
        
        
        
    }

    


    return (
        <div className="main fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
            <button
                onClick={() => close()}
                className="cross button absolute top-20 right-9"
            >
                <img src="/close.png" alt="close" className="w-8 h-8" />
            </button>

            {isSubmitting ? <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="text-white border-red-300 text-6xl font-semibold">
                        Posting...
                    </div>
                </div> : ""}
            <form className="bg-white p-8 rounded-lg shadow-lg border w-96 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-semibold text-center">Resolve Lost Item</h2>

                <div className='title'>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        defaultValue={post.title}
                        readOnly
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the title"
                        {...register("title")}
                    />
                </div>

                <div className='description'>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter a description"
                        rows="3"
                        {...register("description")}
                    />
                </div>

                <div className='phoneNumber'>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="number"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the receiver's phone number"
                        {...register("phoneNumber")}
                    />
                </div>
                <div>
                    <button
                        disabled={isSubmitting}
                        className="w-full bg-black text-white py-2 rounded-full shadow-md hover:bg-zinc-700 transition-colors"
                    >
                        Resolve
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ResolveForm

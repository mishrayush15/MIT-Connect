import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const RequestForm = ({closebtn, postData}) => {


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        const response = await axios.get(`http://localhost:3000/post/request/${postData._id}`, {
            withCredentials: true
        })
        const sendEmail = await axios.post(`http://localhost:3000/post/requests/email/${postData.user.email}`, data ,{
            withCredentials: true
        })
        window.location.reload();
        
        
    }

    return (
        <div className="main z-10 fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
            <button
                onClick={() => closebtn()}
                className="cross button absolute top-20 right-9"
            >
                <img src="/close.png" alt="close" className="w-8 h-8" />
            </button>

            {isSubmitting ? <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="text-white border-red-300 text-6xl font-semibold">
                    Requesting...
                </div>
            </div> : ""}
            <form className="bg-white p-8 rounded-lg shadow-lg w-96 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-semibold text-center">Request Lost Item</h2>

                <div className='title'>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        defaultValue={postData.title}
                        type="text"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter the title"
                        readOnly
                        {...register("title")}
                    />
                </div>

                <div className='name'>
                    <label className="block text-sm font-medium text-gray-700">Posted By</label>
                    <p
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter a description"
                        rows="3"
                        {...register("name")}
                    >
                        {postData.user.name}
                    </p>
                </div>

                <div className='date'>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter a description"
                        rows="3"
                        {...register("date")}
                    >
                        {postData.createdAt.slice(0, 10)}
                    </p>
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

                <div>
                    <button
                        disabled={isSubmitting}
                        
                        className="w-full bg-black text-white py-2 rounded-full shadow-md hover:bg-zinc-700 transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    )
}

export default RequestForm

import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CreatePostForm = ({ close }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Handling image name display
    const handleImageUpload = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    // Handling form submission
    const onSubmit = async (data) =>{
        try{
            const response = await axios.post("http://localhost:3000/post/create", data, {
                withCredentials: true
            })
            window.location.reload();
            
        }catch(error){
            console.log("Error while creating user!");
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
                <h2 className="text-2xl font-semibold text-center">Post Lost Item</h2>

                <div className='title'>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
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

                {/* <div className="image-upload mt-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                    <div className="mt-1 flex items-center justify-center">
                        <label className="w-full h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-zinc-400">
                            <span className="text-gray-500">
                                {selectedImage ? selectedImage.name : 'Upload Image'}
                            </span>
                            <span className="text-gray-500 mt-2 flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                            </span>
                            <input type="file" className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                </div> */}



                <div>
                    <button
                    disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-full shadow-md hover:bg-zinc-700 transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CreatePostForm;

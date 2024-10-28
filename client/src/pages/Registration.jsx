import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Registration = () => {

    const navigate = useNavigate();

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    // Handling form submission
    const onSubmit = async (data) => {
        try{
            const response = await axios.post("http://localhost:3000/user/register", data, {
                withCredentials: true
            });
            navigate('/')
        }catch(error){
            console.log(error)
        }
    };

    return (
        <div className='h-screen w-screen bg-white flex'>

            <div className="w-1/2">
                <img
                    src="/regisimg.png"
                    alt="register"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="form w-1/2 p-8 flex flex-col justify-center">
                {isSubmitting ? <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="text-white border-red-300 text-6xl font-semibold">
                        Creating User...
                    </div>
                </div> : ""}
                <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex space-x-4">
                        <input
                            type="text"
                            placeholder="username"
                            className="w-1/2 border-b border-gray-400 py-2 text-gray-600 focus:outline-none"
                            {...register("username")}
                        />
                        <input
                            type="text"
                            placeholder="name"
                            className="w-1/2 border-b border-gray-400 py-2 text-gray-600 focus:outline-none"
                            {...register("name")}
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            placeholder="email"
                            className="w-full border-b border-gray-400 py-2 text-gray-600 focus:outline-none"
                            {...register("email")}
                        />
                    </div>

                    <div className="flex space-x-4">
                        <input
                            type="password"
                            placeholder="password"
                            className="w-1/2 border-b border-gray-400 py-2 text-gray-600 focus:outline-none"
                            {...register("password")}
                        />
                        <input
                            type="number"
                            placeholder="phone no."
                            className="w-1/2 border-b border-gray-400 py-2 text-gray-600 focus:outline-none"
                            {...register("phoneNumber")}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="enrollment number"
                            className="w-full border-b border-gray-400 py-2 text-gray-600 focus:outline-none"
                            {...register("enrollmentNumber")}
                        />
                    </div>

                    {/* <div className="mt-6 flex justify-center">
                        <label className="flex items-center justify-center w-1/2 h-12 bg-gray-200 text-gray-600 border rounded-full cursor-pointer">
                            <span>identity card</span>
                            <input
                                type="file"
                                className="hidden"
                            />
                            <span className="ml-2 text-lg">+</span>
                        </label>
                    </div> */}

                    <div className="mt-8 flex flex-col items-center">
                        <input
                            type="submit"
                            className="bg-red-500 text-white py-3 px-6 rounded-full text-lg cursor-pointer"
                            value={"Register"}
                            disabled={isSubmitting}>
                        </input>

                        <p className="mt-4 text-gray-600">
                            Already user? <a href="/login" className="text-blue-500">Login</a>
                        </p>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Registration;

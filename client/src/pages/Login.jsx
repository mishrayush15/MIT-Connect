import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    // Initialize react-hook-form
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm();

    // Handling form submission
    const onSubmit = async (data)=>{
        try{
            const response = await axios.post("http://localhost:3000/user/login", data, {
                withCredentials: true,
            })
            navigate('/')
        }catch(error){
            console.log(error);
            window.location.reload();
            
        }
    }



    return (
        <div className="h-screen w-screen flex">

            <div className="w-1/2 bg-white flex flex-col justify-center px-12">
            {isSubmitting ? <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="text-white border-red-300 text-6xl font-semibold">
                        Logging in...
                    </div>
                </div> : ""}
                <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <input
                            type="email"
                            {...register("email")}
                            placeholder="email"
                            className="w-full border-b border-gray-400 py-2 text-gray-600 focus:outline-none placeholder:lowercase"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="password"
                            className="w-full border-b border-gray-400 py-2 text-gray-600 focus:outline-none placeholder:lowercase"
                        />
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-3 px-10 rounded-full text-lg font-bold">
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Already user? <a href="/register" className="text-red-500 ">Register</a>
                        </p>
                    </div>
                </form>
            </div>

            <div className="side-image w-1/2 relative">
                <img
                    src="loginimg.png"
                    alt="login-side-img"
                    className="object-cover w-full h-full"
                />
            </div>

        </div>
    );
};

export default Login;

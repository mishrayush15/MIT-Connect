import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Watermark from '../components/Watermark';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReloadBtn from '../components/ReloadBtn';

const YourPosts = () => {

    const [yourPostData, setYourPostData] = useState([])

    const navigate = useNavigate();

    // Fetching posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/user/profile/posts", {
                withCredentials: true
            })
            setYourPostData(response.data.YourPosts)
        } catch (error) {
            navigate('/login')
        }
    }

    // Fetching posts of all users
    useEffect(() => {
        fetchPosts()
    }, [])

    const deletePost = async (yourpost) => {
        const resposne = await axios.get(`http://localhost:3000/post/delete/${yourpost._id}`, {
            withCredentials: true
        })
        window.location.reload();
    }




    if (!yourPostData) {
        return <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-white border-red-300 text-6xl font-semibold">
                Loading...
            </div>
        </div>
    }
    return (
        <>
            <div className="navbar sticky top-0 z-50 bg-white shadow">
                <Navbar />
            </div>

            <Watermark />

            <div className="main relative min-h-screen transparent p-4 z-[3]">

                {yourPostData.reverse().map((yourpost, key) => {
                    return <div key={yourpost._id} className="posts flex flex-col md:flex-row items-center justify-center">
                        <div className="flex-1 max-w-md p-4 bg-gray-300 bg-opacity-100 m-4 rounded-lg">
                            <img
                                src="/loginimg.png"
                                alt="Descriptive Text"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>

                        <div className="flex-1 max-w-lg p-4 bg-white bg-opacity-100 m-4 border border-gray-300 rounded-lg">
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                    <p
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {yourpost.title}
                                    </p>
                                </div>

                                <div className="flex-grow">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <p
                                        name="description"
                                        id="description"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {yourpost.description}
                                    </p>
                                </div>

                                <div className="flex-grow">
                                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Posted On</label>
                                    <p
                                        name="description"
                                        id="description"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {yourpost.createdAt.slice(0, 10)}
                                    </p>
                                </div>

                                <button
                                    onClick={() => deletePost(yourpost)}
                                    type="button"
                                    className="px-6 py-4 text-sm font-md text-white bg-red-600 rounded-full shadow-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                >
                                    Delete Post
                                </button>
                            </form>
                        </div>
                    </div>
                })}

                <div className="form-buton fixed bottom-4 left-4" >
                    <ReloadBtn />
                </div>

            </div>



        </>
    );
};

export default YourPosts;
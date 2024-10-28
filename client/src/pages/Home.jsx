import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Watermark from '../components/Watermark';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReloadBtn from '../components/ReloadBtn';
import CreatePostForm from '../components/CreatePostForm';
import RequestForm from '../components/RequestForm';

const Home = () => {

    const [postData, setPostData] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [requestForm, setRequestForm] = useState(false)
    const [selectPost, setSelectedPost] = useState(null)

    const navigate = useNavigate();

    // Fetch all; the post
    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/post/fetch", {
                withCredentials: true
            })
            setPostData(response.data.Posts)
        } catch (error) {
            console.log(error);
            navigate('/login')

        }
    }

    // Fetches post on initial render
    useEffect(() => {
        fetchPosts()
    }, [])

    // Function being passed in component as a prop
    const handleShowForm = () => {
        setShowForm(!showForm)
        
    }

    const handleRequestForm = (post) => {
        setSelectedPost(post)
        setRequestForm(!requestForm);
    }



    if (!postData) {
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

                {postData.reverse().map((post, key) => {
                    return <div key={post._id} className="posts flex flex-col md:flex-row items-center justify-center">
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
                                        {post.title}
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
                                        {post.description}
                                    </p>
                                </div>
                                <div className="flex-grow">
                                    <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Create by</label>
                                    <p
                                        name="username"
                                        id="username"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {post.user.name}
                                    </p>
                                </div>

                                <div className="flex-grow">
                                    <label htmlFor="CreatedAt" className="block text-sm font-medium text-gray-700">Date</label>
                                    <p
                                        name="username"
                                        id="username"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {post.createdAt.slice(0, 10)}
                                    </p>
                                </div>

                                <button
                                    type='button'
                                    onClick={()=> handleRequestForm(post)}
                                    className="px-6 py-4 text-sm font-md text-white bg-black rounded-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                >
                                    Request
                                </button>
                            </form>
                            {requestForm ? <RequestForm closebtn={handleRequestForm} postData={selectPost}/> : ""}
                        </div>
                    </div>
                })}

                <div className="fixed bottom-4 left-4">
                    <ReloadBtn />
                </div>

                {showForm ? <CreatePostForm close={handleShowForm} /> : ""}

                

                <div className="form-buton fixed bottom-4 right-4" hidden={showForm}>
                    <button
                        onClick={()=>setShowForm(!showForm)}
                        className="bg-zinc-300 rounded-full w-16 h-16 shadow-lg flex items-center justify-center"
                    >
                        <img src="/plus.png" alt="icon" className="w-8 h-8" />
                    </button>
                </div>

            </div>

        </>
    );
};

export default Home;
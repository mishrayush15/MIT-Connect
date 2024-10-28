import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Watermark from '../components/Watermark'
import ReloadBtn from '../components/ReloadBtn'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ResolveForm from '../components/ResolveForm'


const RequestedPosts = () => {

    const navigate = useNavigate();

    const [requestedPosts, setRequestedPosts] = useState([])
    const [showResolveForm, setShowResolveForm] = useState(false)
    const [selectPost, setSelectPost] = useState(null)
    

    const fetchRequestedPosts = async () => {
        try {
            const postsData = await axios.get("http://localhost:3000/post/requests/fetch", {
                withCredentials: true
            })
            setRequestedPosts(postsData.data.requestedPosts)
        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        fetchRequestedPosts();
    }, [])

    const handleResolveForm = (post) => {
        setSelectPost(post)
        setShowResolveForm(!showResolveForm)
    }


    if (!requestedPosts) {
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

                {requestedPosts.reverse().map((post, key) => {
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
                                    <label htmlFor="createdBy" className="block text-sm font-medium text-gray-700">Requested by</label>
                                    <div
                                        name="username"
                                        id="username"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {post.requestedBy.map((user, index) => { return <p key={index}>+91 {user.phoneNumber}</p> })}
                                    </div>
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
                                onClick={()=>handleResolveForm(post)}
                                    type="button"
                                    className="px-6 py-4 text-sm font-md text-white bg-sky-500 rounded-full shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                                >
                                    Resolve
                                </button>
                            </form>
                        </div>
                    </div>
                })}



                <div className="fixed bottom-4 left-4">
                    <ReloadBtn />
                </div>
                {showResolveForm ? <ResolveForm close={handleResolveForm} post={selectPost}/> : ""}

            </div>

        </>
    )
}

export default RequestedPosts

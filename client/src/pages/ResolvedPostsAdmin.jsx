import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Watermark from '../components/Watermark';
import { useNavigate, Link } from 'react-router-dom';
import ReloadBtn from '../components/ReloadBtn';

const ResolvedPostsAdmin = () => {

    const navigate = useNavigate();

    const [resolvedPosts, setResolvedPosts] = useState([])
    const [users, setUsers] = useState([])

    const fetchResolvedPosts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/post/profile/admin/adminMitConnect/mitconnect@2024-adminpanel-restricted", {
                withCredentials: true
            })
            setResolvedPosts(response.data.posts);
        } catch (error) {
            navigate('/profile/admin/adminMitConnect/deleteUser/mitconnect@2024-adminpanel-restricted')
        }
    }

    const fetchUsers = async () => {
        try {
            const fetchedUser = await axios.get("http://localhost:3000/user/profile/admin/adminMitConnect/mitconnect@2024-adminpanel-restricted", {
                withCredentials: true,
            })
            setUsers(fetchedUser.data.AllUsers)
        } catch (error) {
            navigate('/')
        }
    }

    useEffect(() => {
        fetchResolvedPosts();
        fetchUsers();
    }, [])



    if (!resolvedPosts) return <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-white border-red-300 text-6xl font-semibold">
            Fetching Posts...
        </div>
    </div>
    return (
        <>
            <div className="navbar sticky top-0 z-50 bg-white shadow">
                <div className="bg-white px-10 py-4 border-2 flex justify-between items-center">
                    <Link to="/" className="text-black no-underline hover:underline flex items-center">
                        <img src="/arrow.png" className="w-7 h-7" alt="Back" />
                    </Link>

                    <div className="flex-1 flex justify-center space-x-16">
                        <Link to="/profile/admin/adminMitConnect/deleteUser/mitconnect@2024-adminpanel-restricted"
                            className="relative text-black no-underline hover:underline">
                            Users
                            <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                {users.length}
                            </span>
                        </Link>

                        <Link to="/admin/fetchresolve"
                            className="relative text-black no-underline hover:underline">
                            Resolved Posts
                            <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                {resolvedPosts.length}
                            </span>
                        </Link>

                    </div>
                </div>
            </div>



            <Watermark admin={"Admin"} />

            <div className="main relative min-h-screen transparent p-4 z-[3]">

                {resolvedPosts.reverse().map((post, index) => {
                    return <div key={index} className="users flex flex-col md:flex-row items-center justify-center">
                        <div className="flex-1 max-w-md p-4 bg-gray-300 bg-opacity-100 m-4 rounded-lg">
                            <img
                                src="/loginimg.png"
                                alt="Descriptive Text"
                                className="profile photo w-full h-full object-cover rounded-lg"
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
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description (R)</label>
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
                                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Created At</label>
                                    <p
                                        name="description"
                                        id="description"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {post.date.slice(0, 10)}
                                    </p>
                                </div>

                                <div className="flex-grow">
                                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Resolved By</label>
                                    <p
                                        name="description"
                                        id="description"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {post.createdBy.phoneNumber}
                                    </p>
                                </div>

                                <div className="flex-grow">
                                    <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">Requested By</label>
                                    <p
                                        name="description"
                                        id="description"
                                        rows="3"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                                    >
                                        {post.phoneNumber}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                })}





                <div className="form-buton fixed bottom-4 left-4" >
                    <ReloadBtn />
                </div>

            </div>



        </>
    )
}

export default ResolvedPostsAdmin

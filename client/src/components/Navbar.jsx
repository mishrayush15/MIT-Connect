import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you use it for navigation

const Navbar = () => {

    const [requestCount, setRequestCount] = useState(0);
    const [postCount, setPostCount] = useState(0)

    const count = async () => {
        const response = await axios.get("http://localhost:3000/post/requests/fetch", {
            withCredentials: true
        })
        setRequestCount(response.data.requestedPosts.length)
        const postResponse = await axios.get("http://localhost:3000/user/profile/posts", {
            withCredentials: true
        })
        setPostCount(postResponse.data.YourPosts.length)

    }

    useEffect(() => {
        count()
    }, [])


    return (
        

        // <div className="bg-white px-5 py-4 border-2 flex justify-center">
        //     <div className="space-x-36 relative">
        //         <Link to="/" className="text-black no-underline hover:underline">HOME</Link>


        //         <div className="relative inline-block">
        //             <Link to="/yourposts" className="text-black no-underline hover:underline">YOUR POSTS</Link>


        //             <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
        //                 {postCount}
        //             </span>
        //         </div>

        //         <div className="relative inline-block">
        //             <Link to="/requestedposts" className="text-black no-underline hover:underline">REQUESTS</Link>


        //             <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
        //                 {requestCount}
        //             </span>
        //         </div>

        //         <Link to="/profile" className="text-black no-underline hover:underline">PROFILE</Link>
        //     </div>
        // </div>

        <div className="bg-white px-5 py-4 border-2 flex items-center">
    <div className="flex-shrink-0">
        <Link to="/">
            <img src="/mitconnect.png" alt="Website Logo" className="w-8 h-8" />
        </Link>
    </div>

    <div className="flex-grow flex justify-center space-x-36">
        <Link to="/" className="text-black no-underline hover:underline">HOME</Link>

        <div className="relative inline-block">
            <Link to="/yourposts" className="text-black no-underline hover:underline">YOUR POSTS</Link>
            <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {postCount}
            </span>
        </div>

        <div className="relative inline-block">
            <Link to="/requestedposts" className="text-black no-underline hover:underline">REQUESTS</Link>
            <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {requestCount}
            </span>
        </div>

        <Link to="/profile" className="text-black no-underline hover:underline">PROFILE</Link>
    </div>
</div>

        
    );
};

export default Navbar;

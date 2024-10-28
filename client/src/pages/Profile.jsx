import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Watermark from '../components/Watermark'

const Profile = () => {
    const [userData, setUserData] = useState()
    const navigate = useNavigate();

    // Fetching user data
    const fetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:3000/user/profile", {
                withCredentials: true
            })
            setUserData(response.data.existingUser)
            
        } catch (Error) {
            navigate('/login');
        }
    }

    // Fetching user data on initial render
    useEffect(() => {
        fetchProfile();

    }, [])

    // Handling user log-out
    const logoutUser = async ()=>{
        try{
            const logoutUser = await axios.post("http://localhost:3000/user/logout", {},{
                withCredentials: true
            })
            navigate('/login')
        }catch(error){
            console.log(error);
        }
    }



    if (!userData) {
        return <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-white border-red-300 text-6xl font-semibold">
                Loading...
            </div>
        </div>
    }
    return (
        
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="flex justify-center items-center pt-32">
                <div className="flex items-center space-x-40">
                    <div className="flex flex-col items-center space-y-6">
                        <div className="w-80 h-80 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-black font-semibold">Image</span>
                        </div>

                        <button onClick={()=>{logoutUser()}} className="bg-red-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-red-600">
                            Logout
                        </button>

                        {userData.isAdmin ? <button onClick={()=>navigate('/profile/admin/adminMitConnect/deleteUser/mitconnect@2024-adminpanel-restricted')} className="bg-sky-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-sky-600">
                            Admin Page
                        </button> : "" }
                    </div>

                    <div className="space-y-14">
                        <div className="w-72 bg-gray-200 rounded-full py-4 px-6 text-center">
                            <span className="font-semibold text-black">{userData.name}</span>
                        </div>

                        <div className="w-72 bg-gray-200 rounded-full py-4 px-6 text-center">
                            <span className="font-normal text-black">{userData.email}</span>
                        </div>

                        <div className="w-72 bg-gray-200 rounded-full py-4 px-6 text-center">
                            <span className="font-normal text-black">{userData.enrollmentNumber}</span>
                        </div>

                        <div className="w-72 bg-gray-200 rounded-full py-4 px-6 text-center">
                            <span className="font-normal text-black">{userData.phoneNumber}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile



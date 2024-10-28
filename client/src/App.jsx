import React, { Suspense, useEffect } from 'react'
import axios from 'axios' 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Home from './pages/Home'
import YourPosts from './pages/YourPosts'
import CreatePostForm from './components/CreatePostForm'
import AdminPage from './pages/AdminPage'
import RequestedPosts from './pages/RequestedPosts'
import ResolvedPostsAdmin from './pages/ResolvedPostsAdmin'


const App = () => {

  const adminUrl = import.meta.env.ADMIN_URL
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Registration/>}/>
      <Route path="/yourposts" element={<YourPosts/>}/>
      <Route path="/profile/admin/adminMitConnect/deleteUser/mitconnect@2024-adminpanel-restricted" element={<AdminPage/>}/>
      <Route path="/requestedposts" element={<RequestedPosts/>}/>
      <Route path="/admin/fetchresolve" element={<ResolvedPostsAdmin/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

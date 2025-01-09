import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import PostsList from './Features/Posts/PostsList';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  

  return (
    <>
      <Navbar />
      <PostsList />
      <Sidebar />
    </>
  )
}

export default App

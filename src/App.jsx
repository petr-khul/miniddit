import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import PostsList from './Features/Posts/PostsList';

function App() {
  

  return (
    <>
      <Navbar />
      <PostsList />
    </>
  )
}

export default App

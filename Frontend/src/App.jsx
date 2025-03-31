import { useState } from 'react'
import React from "react"
import './App.css'
import Navbar from "./Components/Navbar.jsx"
import BgTheme from './BgTheme.jsx'
import CreateAccountForm from "./Components/CreateAccountForm.jsx"
function App() {


  return (
    <>
    <BgTheme />
    <div className='max-w-[80%] mx-auto'>
      <Navbar />
      
      <CreateAccountForm />
    </div>
    </>
  )
}

export default App

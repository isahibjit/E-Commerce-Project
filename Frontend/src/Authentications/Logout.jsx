import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
    const navigate = useNavigate()
const handleLogout = async ()=>{
    try {
      const response = await axios.get("http://localhost:3000/api/admin/logout",{withCredentials : true})
      if(response.status === 200){
          window.location.href = "/"
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button onClick={handleLogout}
    className="from-[#FF4C4C] to-[#D63031] bg-gradient-to-r  hover:from-[#D63031] hover:to-[#FF4C4C] focus:outline-none focus:ring-2 focus:ring-red-500
      p-2 rounded-lg  cursor-pointer transition-colors duration-200 btn-block"
  >
    Logout
  </button>
  )
}

export default Logout
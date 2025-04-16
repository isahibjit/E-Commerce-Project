import React from 'react'
import adminLogo from "../../../assets/adminLogo.png";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate, useOutletContext } from 'react-router-dom';
const AdminHeader = ({admin}) => {
 
    const navigate = useNavigate()
    const handleLogout = async ()=>{
        try {
          const response = await axios.get("http://localhost:3000/api/admin/logout",{withCredentials : true})
          if(response.status === 200){
              navigate("/admin")
            toast.success(response.data.message)
          }
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className="border-[1px] border-gray-300">

        <div className="flex   flex-wrap navbar-start w-[80%]  mx-auto items-center justify-between">
          <img src={adminLogo} className="w-40 md:w-52" alt="Admin Logo" />
          <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-bold text-rose-700">{admin.email}</h1>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary rounded-full mt-2 sm:mt-0">
            Logout
          </button>
        </div>
        </div>
  )
}

export default AdminHeader
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminNotAuthorize = ({error}) => {
    const navigate = useNavigate()
    useEffect(() => {
      toast.info(error,{toastId : "unauthorized error"})
      navigate("/admin")
    }, [error])
    
  return (
    <div>
        
    </div>
  )
}

export default AdminNotAuthorize
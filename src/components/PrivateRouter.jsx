import React from 'react'
import { useAuth } from '../context/Auth'
import {toast} from 'react-toastify'; 
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouter = () => {
  const {currentUser} = useAuth()
    
  if(!currentUser){
    toast.error('Please log in first.');
  }

  return currentUser? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRouter
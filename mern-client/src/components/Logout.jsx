import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import {useLocation, useNavigate } from 'react-router-dom';
const Logout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {logout} = useContext(AuthContext)
    const handleLogOut = () => {
        logout().then(()=>{
            alert("Sign-out successfully!")
            navigate(from, { replace: true });
        }).catch((error)=> {

        });
    }
  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
        <button onClick={handleLogOut} className='bg-red-700 px-8  py-2  text-white rounded'>Logout</button>
    </div>
  )
}

export default Logout
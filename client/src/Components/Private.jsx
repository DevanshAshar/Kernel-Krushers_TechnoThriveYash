import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Outlet } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import Unauthorized from './Unauthorized'
import { toast } from 'react-hot-toast'
const Private = () => {
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        const checkAuth=async()=>{
            try {
                const res=await axios.get(`${process.env.REACT_APP_API}/auth/users/me/`)
                if(res.status===200)
                setOk(true)
                else
                setOk(false)
            } catch (error) {
                toast.error('Something went wrong')
                console.log(error.message)
            }
        }
        if(auth?.token)
        checkAuth()
    },[auth?.token])
  return ok?<Outlet/>:<Unauthorized/>
}

export default Private
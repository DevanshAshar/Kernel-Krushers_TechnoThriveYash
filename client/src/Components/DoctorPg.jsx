import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'

const DoctorPg = () => {
    const [userData,setUserData]=useState([])
    
    const getUserData=async()=>{
        try {
            // const res=await axios.get(`${process.env.REACT_APP_API}/getUsers`)
            // setUserData(res.data)
            setUserData([
                {username:'Devansh'},{username:'Dev'},{username:'Harshil'}
            ])
        } catch (error) {
            console.log(error.message)
            toast.error('something went wrong')
        }
    }
    useEffect(()=>{
        getUserData()
    },[])
  return (
    <Layout>
    {userData && userData.length>0?(
        <>
            {userData.map((user) => (
                        <div className="card m-2" key={user.username}>
                            <div className="card-header">{user.username}</div>
                            <div className="card-body">
                                <h5 className="card-title">{`user.email`}</h5>
                                <button className="btn btn-primary m-1">Connect</button>
                                <button className="btn btn-primary m-1">View Prompt CSV</button>
                                <button className="btn btn-primary m-1">View Form CSV</button>
                            </div>
                        </div>
                    ))}
        </>
    ):(<h3>sed</h3>)}
    </Layout>
  )
}

export default DoctorPg
"use client"
import axios from 'axios'
import React, { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState('nothing')
  const logout = async()=>{
 try {
    await axios.get('/api/users/logout');
    toast.success('logout succesdully')
    router.push('/login')
 } catch (error:any) {
   console.log(error.message);
   toast.error(error.message)
 }
  }

 const getUserDetails=async()=>{
 const res = await axios.get('/api/users/me');
 console.log(res.data);
 setData(res.data.data._id);  
}

  return (
    <div>
      <h1>Profile page</h1>
      <h2>{data === 'nothing' ? "Nothing": <Link href={`/profile/${data}`}>{data}
      </Link>}</h2>
      <hr />
      <button onClick={logout}>Log Out</button>
      <button className='ml-4' onClick={getUserDetails}>Get uder details</button>
    </div>
  )
}

export default ProfilePage

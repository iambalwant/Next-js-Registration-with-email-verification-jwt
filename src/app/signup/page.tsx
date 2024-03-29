"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

function SignupPage() {
  const Router = useRouter();
  const [user, setUser] = React.useState({
    email:'',
    password:'',
    username:''
  })
  const [buttonDisabled, setButtonDisabled] =React.useState(false);
  const [loading, setLoading] =React.useState(false);
  // console.log(user)
const onSignup = async ()=>{
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("signup success", response.data);
      Router.push("/verifybutton")
    } catch (error:any) {
      console.log("signup fail",error.message)
      toast.error(error.message)
    }finally{
      setLoading(false);
    }
}

useEffect(()=>{
   if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
    setButtonDisabled(false);
   } else{
    setButtonDisabled(true);
   }
},[user]);

  return (
    <div className='flex justify-center flex-col w-60'>
        <h1>{loading ? "Processing" : "signup"}</h1>
        <hr />
        <input type="text" placeholder='Username' value={user.username} onChange={(e)=>setUser({...user, username: e.target.value})}/>
        <input type="email" placeholder='email' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
        <input type="password" placeholder='password' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
        <button className='border hover:bg-black hover:text-white' onClick={onSignup}>{buttonDisabled ? "No Signup" : "Signup"}</button>
        <Link className='text-blue-600' href="/login">Login here if you have account</Link>
    </div>
  )
}

export default SignupPage

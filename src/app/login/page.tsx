"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


function Loginpage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email:'',
    password:'',
  })
  const [button, setButton] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

const onLogin = async ()=>{
   try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("this is response this status" + response);
      toast.success("login success");
      router.push("/profile");

   } catch (error:any) {
 console.log("login fail :", error.message);   
 toast.error(error.message); 
   }finally{
    setLoading(false);
   }
}

useEffect(()=>{
  if(user.email.length > 0 && user.password.length > 0){
    setButton(false);
  }else{
    setButton(true);
  }
},[user]);

  return (
    <div className='flex justify-center flex-col w-60'>
        <h1>{loading ? "processing" : "login"}</h1>
        <hr />
        <input type="email" placeholder='email' value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
        <input type="password" placeholder='password' value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
        <button className='border hover:bg-black hover:text-white' onClick={onLogin}>Submit Now</button>
        <Link className='text-blue-600' href="/signup">Signup here if you don't have account</Link>
    </div>
  )
}

export default Loginpage

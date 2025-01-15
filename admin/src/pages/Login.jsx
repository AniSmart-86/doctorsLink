import React, { useContext } from 'react'
import { useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import {toast} from 'toastify'

const Login = () => {

    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAdminToken, backendUrl} = useContext(AdminContext);


    const HandleSubmit = async(e)=>{
        e.preventDefault();

        try {
            
            
        if(state){
            const data = await axios.post(`${backendUrl}/login`,{email, password})

            if(data.success){
                toast.success('login successfully');
                console.log(data.token);
                setAdminToken(data.token);
            }

            if(!email || !password){
                alert('Email and Password required!');
            }
        }
        } catch (error){
            console.log(error) 
        }

    }


  return (
   <form onSubmit={HandleSubmit} className='min-h-[80vh] flex items-center'>
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>

<p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login</p>
<div className='w-full'>
    <p>Email:</p>
    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" />
</div>
<div className='w-full'>
    <p>Password:</p>
    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" />
</div>

<button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
       
       {
        state === 'Admin' ? <p>Are you a doctor <span className='text-primary underline cursor-pointer' onClick={()=>setState('Doctor')}> Login here</span></p> :
        <p>Are you an admin<span className='text-primary underline cursor-pointer' onClick={()=>setState('Admin')}> Login here</span></p>
       }
        </div>

   </form>
  )
}

export default Login
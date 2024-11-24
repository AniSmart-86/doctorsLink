import React, { useContext, useState } from 'react'
import profileImg from '../assets/Ani.jpg'
import { DocsContext } from '../context/DocsContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {

  const {userData, setUserData, token, BackendUrl, loaduserData} = useContext(DocsContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

const updateUser = async()=>{

try {
  

  const formData = new FormData();

  formData.append('name',userData.name)
  formData.append('phone',userData.phone)
  formData.append('address',JSON.stringify(userData.address))
  formData.append('gender',userData.gender)
  formData.append('dob',userData.dob)



  image && formData.append('image', image)

  const {data} = await axios.post(BackendUrl + '/api/users/update-profile', formData, {headers: {token}})

  if(data.success){
    toast.success(data.message)
    await loaduserData()
    setIsEdit(false)
    setImage(false)
  }else{
    toast.error(data.message)
  }
} catch (error) {
  console.log(error)
  toast.error(data.message)
}


}


  return userData && (
    <div className='max-w-lg flex flex-col gap-6 text-sm'>

      {
        isEdit ? <label htmlFor="image"> 
        <div className='inline-block relative cursor-pointer'>
        <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
        <img className='w-10 absolute bottom-12 right-12' src={image ? '' : profileImg} alt="" />
        </div>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label> :
          <img className='w-36 rounded-3xl shadow-2xl shadow-sky-600' src={userData.image} alt="" />
      }
    {
      isEdit ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e =>setUserData(prev =>( {...prev,name:e.target.value }))} /> : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
    }
    <hr className='bg-zinc-400 h-[2px] border-none'/>
    <div>
      <p className='text-neutral-500 underline mt-3 mb-1'>CONTACT INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>
        <p className='font-medium'>Email Address:</p>
        <p className='text-blue-500'>{userData.email}</p>
        <p className='font-medium'>Phone Number:</p>
        {
          isEdit ? <input className='bg-gray-100 max-w-52' type="number" value={userData.phone} onChange={e =>setUserData(prev =>( {...prev,phone:e.target.value }))} /> : <p className='text-blue-500'>{userData.phone}</p>
        }

        <p className='font-medium'>Address:</p>
        {
          isEdit ? <p>
            <input className='bg-gray-100 '  type="text" value={userData.address.line1} onChange={e =>setUserData(prev =>( {...prev,line1:e.target.value }))} />
            <br />
            <input className='bg-gray-100 ' type="text" value={userData.address.line2} onChange={e =>setUserData(prev =>( {...prev,line2:e.target.value }))} />
          </p> : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
        }
      </div>
    </div>

    <div>
      <p className='text-neutral-500 underline mt-3 mb-1'>BASIC INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3 text-neutral-700'>
        <p className='font-medium'>Gender:</p>
        {
      isEdit ? <select className='max-w-20 bg-gray-100' onChange={(e)=> setUserData(prev => ({...prev, gender: e.target.value }))}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select> : <p className='text-gray-400'>{userData.gender}</p>
    }

    <p className='font-medium'>Birth Date:</p>
    {
      isEdit ? 
      <input className='bg-gray-100 max-w-28'  type="date" value={userData.dob} onChange={e =>setUserData(prev =>( {...prev,dob:e.target.value }))} /> : 
      <p className='text-gray-400'>{userData.dob}</p>
    }
      </div>
    </div>

    <div>
      {
        isEdit ?
        <button className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white hover:scale-x-105 transition-all duration-1000 ease-in-out' onClick={updateUser}>Save</button> :
        <button className='border border-blue-600 px-8 py-2 rounded-full hover:bg-blue-600 hover:text-white hover:scale-x-105 transition-all duration-1000 ease-in-out' onClick={()=>setIsEdit(true)}>Edit</button>
      }
    </div>
    </div>
  )
}

export default Profile
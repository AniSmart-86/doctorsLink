import React from 'react'
import { specialityData } from '../assets/DocData'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const SpecialityMenu = () => {
  return (

    <motion.div
    initial={{ opacity: 0}}
    whileInView={{ opacity: 1,
      scale: 1.1,
     transition:{duration: 3} }}
    >

    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='speciality'>
  

<h1 className='text-xl md:text-3xl font-semibold'>Select Doctors In Speciality</h1>
<p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassel-free</p>
   
   <div className='flex sm:justify-center gap-6 pt-5 w-full overflow-x-scroll'>
    {specialityData.map((item, index)=>(
        <Link onClick={()=>{scrollTo(0,0)}} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-1000' key={index} to={`/doctors/${item.speciality}`}>
        <img  className='w-16 sm:w-24 mb-2' src={item.img} alt="" />
        <p>{item.speciality}</p>
        </Link>
    ))}
   </div>
   
   
    </div>
    </motion.div>
  )
}

export default SpecialityMenu
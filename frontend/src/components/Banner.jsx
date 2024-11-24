import React, { useState } from 'react'
import Img1 from '../assets/banner2-img.jpg'
import Img2 from '../assets/hero-img.jpeg'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Banner = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/login");
            scrollTo(0,0);
        }, 3000);
      };
  return (
    <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1,
      scale: 1.05,
     transition:{duration: 3} }}
    >

    <div className='flex justify-center items-center bg-primary rounded-3xl px-6 sm:px-10 md:px-14 lg:px-12 my-40 md:mx-10 relative'>
            <img className='w-full absolute -top-36 max-w-lg rounded-xl -z-10 lg:-top-72 lg:max-w-3xl' src={Img2} alt="" />
        {/* ====Left side==== */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:pl-5'>
            <div className='text-xl text-center sm:text-2xl md:text-3xl lg:text-md font-medium text-white'>
                <p >Get In Touch</p>
                <p className='mt-1'>With 100+ Trusted Doctors</p>
            <button className='bg-white text-red-700 px-12 py-2 relative rounded-full mt-10 hover:scale-x-105 transition-all duration-1000 ease-in-out border-none outline-none text-lg' onClick={handleClick}>
      {isLoading ? (
        <div className="flex items-center">
          <div className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full text-red-700" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <span>Create account</span>
      )}
        
    </button>
        </div>
        </div>

        {/* ====Right side=== */}
        
    </div>
      </motion.div>
  )
}

export default Banner
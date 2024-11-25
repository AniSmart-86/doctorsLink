import React from 'react'
import logo from '../assets/health-logo.jpeg'
const Footer = () => {
  return (
    <div className='md:mx-10 bg-gray-300 px-10 py-1 mt-20'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm '>

<div>
    <div className='flex items-center my-3'>

    <img className='w-8 bg-blue-100 rounded-full mx-1' src={logo} alt="" />
    <span className='text-md font-semibold text-red-700'>DocLink</span>
    </div>
    <p className='w-full md:w-2/3 text-gray-600 leading-6'>At <span className='text-sm text-red-700'>DocLink</span> we believe that healthcare should be accessible, efficient, and patient-centered. Our mission is to revolutionize the way patients schedule and manage their doctor's appointments, making healthcare more convenient, affordable, and effective.
    </p>
</div>

<div>
    <h5 className='text-xl font-medium mb-5'>COMPANY</h5>
    <ul className='flex flex-col gap-2 text-gray-600'>
        <li>Home</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
    </ul>
</div>
<div>
    <h5 className='text-xl font-medium mb-5'>GET IN TOUCH</h5>
    <ul className='flex flex-col gap-2 text-gray-600'>
        <li>+234 8086717124</li>
        <li>anismart124@gmail.com</li>
    </ul>
</div>



        </div>
        <div>
            <hr />
            <p className='py-3 text-sm text-center'>&copy; Copyright <span>{ new Date().getFullYear()}  |  CodeCrakers - All Right Reserved.</span></p>
        </div>
    </div>
  )
}

export default Footer
import React from 'react'
import contactImg from '../assets/contact-img.jpeg'

const Contact = () => {
  return (
    <div>

<div className='text-center text-2xl pt-10 text-gray-500'>
            <p>CONTACT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
        <div className='my-8 flex flex-col md:flex-row gap-12'>
            <img className='w-full md:max-w-[360px]' src={contactImg} alt="" />
            <div className='flex flex-col justify-center gap-10 md:w-2/4 text-sm text-gray-600 leading-6'>
                <p className='font-semibold text-lg '>OUR OFFICE</p>
                <p>4357 Kings way GRA Enugu <br /> Independency layout, Enugu Nigeria</p>


                <p>Tel: (+234) 8086717124 <br /> Email: anismart124@gmail.com</p>
                <p className='font-semibold text-lg'> Career at DocLink</p>
                <p>Learn more about our teams and jobs openings.</p>
                <button className='border border-black px-4 py-3 text-sm rounded-md hover:bg-black hover:text-white hover:scale-105 transition-all duration-1000 ease-in-out'>Explore Jobs</button>
            </div>
        </div>
    </div>
  )
}

export default Contact
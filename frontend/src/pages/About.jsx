import React from 'react'
import aboutImg from '../assets/about-img.jpeg'
const About = () => {
  return (
    <div>


        <div className='text-center text-2xl pt-10 text-gray-500'>
            <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
        </div>
        <div className='my-10 flex flex-col md:flex-row gap-12'>
            <img className='w-full md:max-w-[360px]' src={aboutImg} alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 leading-6'>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, similique?</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi repellendus aperiam quidem culpa reiciendis molestiae earum voluptatem! Culpa laborum labore cupiditate blanditiis perspiciatis reprehenderit at. Quas architecto nam sunt magnam!</p>

                <b>Our Vision</b>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nostrum asperiores aperiam quasi dicta nemo dolores perspiciatis, corrupti in reprehenderit suscipit laborum necessitatibus, et enim nulla praesentium dolorem itaque ratione.</p>
            </div>
        </div>
        <div className='text-xl my-4'>
            <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
        </div>

        <div className='flex flex-col md:flex-row mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-600 hover:text-white transition-all'>
                <b>Efficiency</b>
                <p>Streamline appointment scheduling that fits into your 
                    busy lifestyle</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-600 hover:text-white transition-all duration-1000 ease-in-out'>
                <b>Convenience:</b>
                <p>Access to a network of trusted healthcare
                     professionals in your area.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-green-600 hover:text-white transition-all'>
                <b>Personalization</b>
                <p>Tailored recommendations 
                    and reminders to help you stay on top of your health.</p>
            </div>
        </div>
    </div>
  )
}

export default About
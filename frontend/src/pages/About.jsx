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
                <p>
At DocLink, we believe that healthcare should be accessible, efficient, and patient-centered. Our mission is to revolutionize the way patients schedule and manage their doctor's appointments,
</p>
                <p> making healthcare more convenient, affordable, and effective.</p>

                <b>Our Vision</b>
                <p>Our vision is to create a seamless and integrated healthcare experience that empowers patients to take control of their health. We aim to achieve this by:

- Providing a user-friendly and intuitive platform for patients to schedule and manage their appointments
- Partnering with healthcare providers to offer a wide range of medical specialties and services
- Leveraging technology to streamline communication, reduce wait times, and improve patient outcomes
- Fostering a culture of transparency, accountability, and patient-centered care
</p>
                <b>Our Value</b>
                <p> At DocLink, we value:

- Patient-centered care: We put the needs and preferences of our patients at the forefront of everything we do.
- Innovation: We embrace new technologies and innovative solutions to improve the healthcare experience.
- Collaboration: We partner with healthcare providers, patients, and other stakeholders to create a seamless and integrated healthcare ecosystem.
- Quality: We strive for excellence in everything we do, from the design of our platform to the delivery of our services.

</p>
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
import React, { useContext } from 'react'
import { DocsContext } from '../context/DocsContext'
const Myappointment = () => {

    const { doctors }= useContext(DocsContext);
    
    console.log(doctors);
  return (
    <div>

        <p className='pb-3 pt-12 font-medium text-zinc-700 border-b-2'>My appointment(s)</p>
        <div>
            {doctors?.slice(0,2).map((item)=>(
                <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b-2' key={item._id}>

                    <div>
                        <img className='w-32 bg-indigo-100' src={item.img} alt="" />
                    </div>
                    <div className='flex-1 text-zinc-600 text-sm'>
                        <p className='text-neutral-800 font-semibold'>{item.name}</p>
                        <p>{item.speciality}</p>
                        <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                        <p className='text-xs'>{item.address.line1}</p>
                        <p className='text-xs'>{item.address.line2}</p>
                        <p className='text-xs mt-1 '><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> 26, Nov, 2024 | 8:49 PM</p>
                    </div>
                    <div></div>
                    <div className='flex flex-col gap-4 justify-end'>
                        <button className='text-sm text-white text-center rounded-xl sm:min-w-12 py-2 bg-green-600 border hover:bg-green-400 hover:scale-x-105 transition-all duration-1000 ease-in-out'>make payment</button>

                        <button className='text-sm text-white text-center rounded-xl sm:min-w-40 py-2 bg-red-900 border hover:bg-red-700 hover:scale-x-105 transition-all duration-1000 ease-in-out'> cancel appointment</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Myappointment
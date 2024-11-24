import React, { useContext, useState } from 'react'
// import { doctors } from '../assets/DocData'
import { useNavigate } from 'react-router-dom'
import { DocsContext } from '../context/DocsContext';
import Loader from './Loader';
import { motion } from 'framer-motion';




const TopDoctors = () => {

    const navigate = useNavigate();

    const { doctors } = useContext(DocsContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate("/doctors")
            scrollTo(0,0)
        }, 2000);
      };
    

  return (
    <div className='flex flex-col items-center gap-4 my-16 mb-24 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors To Book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, <br className='hidden' /> schedule your appointment hassel-free</p>

        <div className="w-full grid grid-cols-auto gap-10 pt-5 gap-y-12 px-3 sm:px-0 ">
            {doctors.slice(0,10).map((item)=>(
              
                  <motion.div
                  initial={{ opacity: 0, y: 0}}
                  whileInView={{ opacity: 1, y: 50,
                    scale: 1.1,
                   transition:{duration: 3} }}
                  >
              <div key={item._id} onClick={()=> {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-1000 ease-in-out">
                    <img className='bg-blue-50 w-full' src={item.img} alt="" />
                    <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-center text-green-500">
                            <p className="w-2 h-2 bg-green-500 rounded-full"></p><p>Available</p>
                        </div>
                        <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">{item.speciality}</p>
                    <button className='border px-8 mt-4 rounded-3xl bg-green-500 text-white'>Book</button>
                    </div>
                </div>
            </motion.div>
            ))}
        </div>
        <button className='bg-primary text-white px-12 py-2 rounded-full my-10 lg:mb-40 mt-20 hover:scale-x-105 transition-all duration-1000 ease-in-out border-none outline-none' onClick={handleClick}>
      {isLoading ? (
        <div className="flex items-center">
          <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full text-indigo-500" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : (
        <span>Load More</span>
      )}
    </button>

{/* <button onClick={()=>{isLoading ? <Loader /> : navigate("/doctors"); scrollTo(0,0)}} >More</button> */}
</div>
  )
}

export default TopDoctors
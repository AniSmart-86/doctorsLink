import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocsContext } from '../context/DocsContext';
import { motion } from 'framer-motion';

const Doctors = () => {

    const { speciality } = useParams();
    const [filterDocs, setFilterDocs] = useState([]);
    // console.log(speciality)
    const { doctors } = useContext(DocsContext);
    const navigate = useNavigate();
    
    const applyFilter = ()=>{
        if(speciality){
            setFilterDocs(doctors.filter(doc => doc.speciality === speciality));
        }else{
            setFilterDocs(doctors);
        }
    }

    useEffect(()=>{
        applyFilter();
    },[doctors, speciality]);
    
    // console.log(filterDocs)

  return (
    <div>

        <p className='text-gray-600'>Browse through the doctors specialist</p>
        <div className='flex flex-col sm:flex-row items-start gap-5 mt-5 '>
            <div className='flex flex-col gap-6 text-sm'>
                <p onClick={()=>{speciality === "General Physician" ? navigate("/doctors") : navigate("/doctors/General Physician")}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General Physician" ? "bg-indigo-100" : ""}`}>General Physician</p>
                <p onClick={()=>{speciality === "Gynecologist" ? navigate("/doctors") : navigate("/doctors/Gynecologist")}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100" : ""}`}>Gynecologist</p>
                <p onClick={()=>{speciality === "Dermatologist" ? navigate("/doctors") : navigate("/doctors/Dermatologist")}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100" : ""}`}>Dermatologist</p>
                <p onClick={()=>{speciality === "Pediatricians" ? navigate("/doctors") : navigate("/doctors/Pediatricians")}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100" : ""}`}>Pediatricians</p>
                <p onClick={()=>{speciality === "Neurologist" ? navigate("/doctors") : navigate("/doctors/Neurologist")}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100" : ""}`}>Neurologist</p>
                <p onClick={()=>{speciality === "Gastroenterologist" ? navigate("/doctors") : navigate("/doctors/Gastroenterologist")}} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100" : ""}`}>Gastroenterologist</p>
            </div>

        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {filterDocs?.map((item)=>(
            <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 50,
              scale: 1.03,
             transition:{duration: 3} }}
            >

                <div key={item._id} onClick={()=>navigate(`/appointment/${item._id}`)} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-1000 ease-in-out">
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
            </div>
    </div>
  )
}

export default Doctors
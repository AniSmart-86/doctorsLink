import React, { useContext, useEffect, useState } from 'react'
import { DocsContext } from '../context/DocsContext'
import { useNavigate } from 'react-router-dom';

const RelatedDocs = ({docId,speciality}) => {

    const navigate = useNavigate();
    const { doctors } = useContext(DocsContext);

    const [ relDoc, setRelDoc ] = useState([]);
console.log(relDoc)

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
    <h1 className='text-3xl font-medium'>Related Doctors</h1>
    <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, <br className='hidden' /> schedule your appointment hassel-free</p>

    <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0 ">
        {relDoc.slice(0,4).map((item)=>(
            <div key={item._id} onClick={()=>{ navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-1000 ease-in-out">
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
        ))}
    </div>
    <button onClick={()=>{navigate("/doctors"); scrollTo(0,0)}} className='bg-primary text-white px-12 py-2 rounded-full mt-10 hover:scale-x-105 transition-all duration-1000 ease-in-out'>More</button>
</div>
  )
}

export default RelatedDocs
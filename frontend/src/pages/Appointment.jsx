import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DocsContext } from '../context/DocsContext';
import RelatedDocs from '../components/RelatedDocs';
import verifiedImg from '../assets/image.png';
import ReviewForm from '../components/ReviewForm';
import Rating from '../components/Rating';

const Appointment = () => {

const navigate = useNavigate();
const { docId } = useParams();

const { doctors, currencySymbol } = useContext(DocsContext);
// console.log(doctors)
const Days = ["SUN", "MON", "TUE", "WED", "THURS", "FRI", "SAT"];

const [ docInfo, setDocInfo] = useState(null);
const [docSlots, setDocSlots] = useState([]);
const [slotIndex, setSlotIndex] = useState(0);
const [slotTime, setSlotTime] = useState('');
const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [day, setDay] = useState({day: '', date: ''})

const fetchDocInfo = async () =>{

    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo);
    console.log(docInfo);
}



const getAvailableSlote = async () =>{
setDocSlots([])

// getting current date
let today = new Date()

for(let i = 0; i < 7; i++){
    let currentDate = new Date(today)
    currentDate.setDate(today.getDate()+i);

    // setting endTime of the date
    let endTime = new Date()
    endTime.setDate(today.getDate()+i)
    endTime.setHours(21, 0, 0, 0)

    // setting Hours
    if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
    }else{
        currentDate.setHours(10)
        currentDate.getMinutes(0)
    }

    let timeSlot = []

    while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        
        timeSlot.push({
            datetime: new Date(currentDate),
            time: formattedTime,
        });
                       
        // increment current time by 30 mins
        currentDate.setMinutes(currentDate.getMinutes()+30)
    }
    setDocSlots(prev => ([...prev, timeSlot]));
}
}

useEffect(()=>{
fetchDocInfo();
},[doctors, docId]);


useEffect(()=>{
    getAvailableSlote();
    console.log(docSlots)
},[docInfo]);


useEffect(()=>{
},[docSlots]);

const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setModal(true);
    
    }, 4000);
  };



  useEffect(() => {
    // Initial slot and date load
    if (docSlots.length > 0 && docSlots[0]?.[0]) {
      const firstSlot = docSlots[0][0];
      setDay({
        day: Days[firstSlot.datetime.getDay()],
        date: firstSlot.datetime.getDate(),
      });
    }
  }, [docSlots]);
  
  const handleDay = (index, item) => {
    const firstSlot = item[0] || null;
    setSlotIndex(index);
    setDay({
      day: firstSlot ?  Days[item[0].datetime.getDay()] : "N/A",
      date: firstSlot ? firstSlot.datetime.getDate() : "N/A",
    });
  };
  



  return docInfo && (
    <div className='mb-72'>
        <div className='flex flex-col sm:flex-row gap-4'>

     
            <div>
<img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.img} alt="" />

            </div>
<div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
    <p className='text-2xl font-medium text-gray-900'>{docInfo.name}</p>
    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
        <p>{docInfo.degree} - {docInfo.speciality}</p>
        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
    </div>

    <div>
        <p className='text-sm font-medium text-gray-900 mt-3'>About:</p>
        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.About}</p>
    </div>
    <p className="text-gray-500 font-medium mt-4">Appointment fee: <span className="text-gray-600">{currencySymbol}{docInfo.fees}</span></p>
</div>
           
        </div>

        {/* BOOKING SLOTE */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
            <p>Booking Slote</p>
            <div className='flex gap-4 items-center w-full overflow-x-scroll mt-4'>
                {docSlots.length && docSlots.map((item, index)=>(
                     <div onClick={()=>handleDay(index, item)} className={`text-center py-1 px-4 min-w-24 rounded-full cursor-pointer ${slotIndex === index? 'bg-green-700 text-white': 'border border-gray-200'}`} key={index}>
                        <p>{item[0] && Days[item[0].datetime.getDay()]}</p>
                        <p>{item[0] && item[0].datetime.getDate()}</p>
                    </div> 
                ))}
            </div>

            <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                {docSlots.length && docSlots[slotIndex].map((item, index)=>(
                    <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime? 'bg-green-700 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                        {item.time.toLowerCase()}
                    </p>
                ))}
            </div>
            <button onClick={handleClick} className='bg-green-700 text-white text-sm font-light px-12 py-3 rounded-full my-10 hover:scale-x-105 translate-x-2 duration-1000 ease-in-out'>
                {
                    isLoading ? (
                        <div className="flex items-center">
          <div className="spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full text-indigo-500" role="status">
            {/* <span className="sr-only">Loading...</span> */}
          </div>
          <span className="ml-2">Processing...</span>
        </div>
                    ) : (
                        <span>Book an appointment</span>
                    )
                }
            </button>
            <div>


            <Rating/>
</div>
        </div>

        <RelatedDocs docId={docId} speciality={docInfo.speciality} />
        { 
            modal &&  <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
            <div className='h-2/2 bg-red-900 text-white border rounded-lg p-8 py-5 mx-5'>
                <div className='flex justify-center '>
                    <img className='w-32 sm:w-32 rounded-full' src={verifiedImg}/>
                </div>
                
                <p className='py-12 leading-6 text-center text-xl lg:text-2xl'>You have successfully booked an appointment with <span>{docInfo.name}</span> </p>
                <p>Day: {day.day}</p>
                <p>Date: {day.date}/{new Date().getMonth()}/{new Date().getFullYear()}</p>
                <p>Time: <span>{slotTime}</span> </p>
                <p>Google Meet Link: <span className="text-blue-700 underline text-sm">https://meet.google.com/phw-jhjw-ddu</span>  </p>
                <div className='items-center justify-center gap-4 lg:mt-10'>
        
            <button onClick={()=>{navigate('/my-appointment'); scrollTo(0,0)}} className='my-5 bg-white text-red-700 w-full sm:min-w-20 py-2 text-sm font-light rounded-full hover:scale-x-105 translate-x-2 duration-1000 ease-in-out'>Appointment List</button>
            <button onClick={()=>setModal(false)} className='bg-zinc-800 text-white w-full sm:min-w-20 py-2 text-sm font-light rounded-full hover:scale-x-105 translate-x-2 duration-1000 ease-in-out'>Cancel</button>
                </div>
            </div>
           </div>
        }
   {/* pop up */}
  
   
    </div> 
  )
}

export default Appointment
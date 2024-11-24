import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Myappointment from './pages/Myappointment'

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Footer from './components/Footer'
import Appointment from './pages/Appointment'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import Loader from './components/Loader'


function App() {

  return (
   
    <div>
      <Navbar />
      <ToastContainer />
      {/* <Loader /> */}
    <div className="mx-5 pt-24 sm:mx-[8%]">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/my-appointment' element={<Myappointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
    </div>
  )
}

export default App

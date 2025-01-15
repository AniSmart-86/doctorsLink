import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className="">
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App
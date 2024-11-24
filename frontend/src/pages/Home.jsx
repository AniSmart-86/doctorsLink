import React from 'react'
import Hero from '../components/Hero'
import SpecialityMenu from '../components/SpecialityMenu'
import Appointment from './Appointment'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Hero />
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
        {/* <Appointment /> */}
    </div>
  )
}

export default Home
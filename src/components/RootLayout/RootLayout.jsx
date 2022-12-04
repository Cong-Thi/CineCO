import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header'

const RootLayout = () => {
  return (
    <div style={{minHeight: "100vh"}}>
        <Header />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default RootLayout
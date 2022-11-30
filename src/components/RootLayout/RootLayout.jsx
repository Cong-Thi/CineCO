import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'

const RootLayout = () => {
  return (
    <div style={{minHeight: "100vh"}}>
        <Header />
        <Outlet/>
    </div>
  )
}

export default RootLayout
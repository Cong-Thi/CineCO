import React from 'react'
import { Outlet } from 'react-router-dom'

// Layout cho phần authen
const Auth = () => {
  return (
    <div className='auth'>
        <Outlet/>
    </div>
  )
}

export default Auth
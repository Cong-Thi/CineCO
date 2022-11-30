import React from 'react'
import { Outlet } from 'react-router-dom'

// Layout cho phần authen
const Auth = () => {
  return (
    <div>
        <h1>Authentication</h1>

        <Outlet/>
    </div>
  )
}

export default Auth
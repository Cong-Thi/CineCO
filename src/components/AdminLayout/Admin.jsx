import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

//Component
import AdminNavbar from "../../components/Navbar"
import SideBar from '../SideBar/SideBar';
//React-Bootstrap
//SCSS
import "./admin.scss";

const Admin = () => {
  
  return (
    <div className="admin">
    <AdminNavbar/>
    <div className="admin__content">
     <SideBar/>
     <Outlet/>
     </div>
     </div> 
  )
}

export default Admin
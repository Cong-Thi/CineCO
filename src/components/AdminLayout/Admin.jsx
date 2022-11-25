import React, { useState } from 'react';

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
    
     <SideBar/>

     </div>
  )
}

export default Admin
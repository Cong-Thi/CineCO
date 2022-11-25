import React,{useState} from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { BiMovie } from "react-icons/bi";
import { NavLink } from 'react-router-dom';

import "./sidebar.scss"


const menu=[
    { title: "Người dùng", icon: <AiOutlineUser />, path: "/admin" },
    { title: "Phim", icon: <BiMovie />, path: "/admin/movie-admin" },
]

const SideBar = () => {
    
  return (
    
      <div className="sidebar">
        <div className="sidebar__menu">
        {menu.map((item, index)=>(
            <NavLink key={index} to={item.path} className="sidebar__item">
                <div className="sidebar__inner">
                    <div className="sidebar__icon">{item.icon}</div>
                    <div className="sidebar__title">{item.title}</div>
                </div>

            </NavLink>
        ))}
        </div>
      </div>
    
  )
}

export default SideBar
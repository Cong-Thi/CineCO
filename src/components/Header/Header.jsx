import React from "react";
import { Link, NavLink } from "react-router-dom";
import {routes}  from "../../routers/routes";
import { Container } from "@mantine/core";
import "./header.scss";
import logo from "../../assets/img/logo-cineco.png"
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "react-bootstrap";

import {logout} from "../../slices/authSlice"

 const Header = () => {

  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.auth)

  const handleLogout = () => {
    dispatch(logout());
    alert("Bạn đã đăng xuất")
  }
  const Logged = () =>{
    return(
      
    <Nav className="account">
      <Nav.Link href="/">Xin Chào {user.hoTen}</Nav.Link>
      <Nav.Link onClick={handleLogout}>Đăng Xuất</Nav.Link>
      
      </Nav>
    )
}
  const Nonlogged = () =>{

    return(
        <Nav className="account">
          <Nav.Link href="/signin">Đăng Nhập</Nav.Link>
          <Nav.Link href="/signup">Đăng Ký</Nav.Link>
        </Nav>
      )
  }
  return (
    <div className="header">
      <Container size="xl">
          <div className="logo">
              <Link to="/">
              <img src={logo} alt="logo-cineco" width="200px" />
              </Link>
          </div>
          {/* <div className="menu">
              {routes.map((item, index) => (
                <NavLink to={item.path} key={index}>
                  {item.title?.toUpperCase()}
                </NavLink>
              ))}
          </div> */}
          <div className="menu">

            <Link to="/" className="link__home bx bxs-home"></Link>

            <div className="nav-menu">
              <ul>
                <li><Link to="/movie/:movieId">Phim</Link></li>
                <li><Link to="/movie/:movieId">Lịch Phim</Link></li>
                <li><Link to="/movie/:movieId">Tin Tức</Link></li>
                <li><Link to="/movie/:movieId">Liên Hệ</Link></li>
              </ul>
            </div>
            
          </div>
            {user ?<Logged/> : <Nonlogged/>}
      </Container>
    </div>
  );
};


export default Header;

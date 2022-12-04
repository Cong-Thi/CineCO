import React from "react";
import { Link, NavLink } from "react-router-dom";
import {routes}  from "../../routers/routes";
import { Container } from "@mantine/core";
import "./header.scss";
import logo from "../../assets/img/logo-cineco.png"


 const Header = () => {
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
          <div className="account">
            <Link to="/signin"><i className="bx bxs-user"></i>Đăng Nhập</Link>
            {/* <Link to="/signup">Đăng Ký</Link> */}
          </div>
      </Container>
    </div>
  );
};


export default Header;

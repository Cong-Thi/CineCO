import React from "react";
import { Link,NavLink } from "react-router-dom";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";
import "./menu.scss";
import { Nav } from "react-bootstrap";


const Menu = () => {
  const openMenu = () => {
    const menu = document.querySelector(".menu-modal");
    menu.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const cancelMenu = () => {
    const menu = document.querySelector(".menu-modal");
    menu.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="menu-icon" onClick={openMenu}>
        <AiOutlineMenu fontSize={32} />
      </div>

      <div className="menu-modal">
        <div className="menu-content">
              <ul>
                <li><Link to="/">Trang Chủ</Link></li>
                <li><Link to="/">Phim</Link></li>
                <li><Link to="/">Lịch Phim</Link></li>
                <li><Link to="/">Tin Tức</Link></li>
                <li><Link to="/">Liên Hệ</Link></li>
              </ul>
              <Nav className="account">
                <Nav.Link className="account-button" href="/signin">Đăng Nhập</Nav.Link>
                <Nav.Link className="account-button" href="/signup">Đăng Ký</Nav.Link>
              </Nav>
        </div>
        <div className="menu-cancel" onClick={cancelMenu}>
          <ImCancelCircle fontSize="32px" />
        </div>
      </div>
    </>
  );
};
export default Menu;

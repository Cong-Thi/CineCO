import React, { useEffect, useState } from 'react'
import usersAPI from "../../../service/usersManagementAPI"
//react-bootstrap
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import ReactPaginate from 'react-paginate';
//scss
import "./userAdmin.scss"
const UserAdmin = () => {
  const [users, setUser] = useState([])
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

 

  const [numpage, setNumpage] = useState("")
  const [userSearch, setUserSearch] = useState([])


  const [searchValue, setSearchValue] = useState("")
  const keys = ["taiKhoan", "email", "hoTen"]
  const handleSearch = () => {
    const newUserSearch = users.filter((item) => keys.some((key)=>item[key].toLowerCase().includes(searchValue)))
    setUserSearch(newUserSearch)
  }
  const endOffset = itemOffset + itemsPerPage;
  const currentItems =userSearch.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userSearch.length / itemsPerPage);

  const handlePageClick = (event) => {
    setNumpage(event.selected)
    const newOffset = (event.selected * itemsPerPage) % users.length;

    setItemOffset(newOffset);
  };
  useEffect(()=> {
    (async () => {
      try {
        const data = await usersAPI.getUsers();
        setUser(data);
        setUserSearch(data);
      } catch (error) {
        console.log(error);
      }
     
    })();
  },[])

  return (
    <div className='user-admin'>
      <div className="user-admin__content">
        <div className="user-admin__content__title">
          <div className="title-text">
          <h3>Quản lý người dùng</h3>
          </div>
          <InputGroup>
            <Form.Control
              placeholder="Tìm Kiếm..."
              aria-label="search"
              aria-describedby="basic-addon1"
              onChange = {(e)=> setUserSearch(e.target.value)}
            />
            <Button 
            onClick={()=> handleSearch()}
            >
            <FaSearch />
            </Button>
          </InputGroup>
          <Button className='btn-add'>
            Thêm người dùng
          </Button>
        </div>
        <Table bordered hover>
      <thead>
        <tr>
          <th>STT</th>
          <th>Tài Khoản</th>
          <th>Họ Tên</th>
          <th>Email</th>
          <th>Số Điện thoại</th>
          <th>Mã loại người dùng</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.map((user,index)=>(
          <tr key={user.taiKhoan}>
            <th>{numpage*itemsPerPage + index + 1 }</th>
            <th>{user.taiKhoan}</th>
            <th>{user.hoTen}</th>
            <th>{user.email}</th>
            <th>{user.soDT}</th>
            <th>{user.maLoaiNguoiDung}</th>
          </tr>
        ))}
      </tbody>
    </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
  </div>
</div>      
  )
}

export default UserAdmin
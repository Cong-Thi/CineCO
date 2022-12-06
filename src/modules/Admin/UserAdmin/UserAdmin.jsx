import React, { useEffect, useState } from 'react'
import usersAPI from "../../../services/usersManagementAPI"
//react-bootstrap
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { FaRegEdit } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'
import ReactPaginate from 'react-paginate';
//scss
import "./userAdmin.scss"
import UserModal from '../../../components/UserModal/UserModal'
const UserAdmin = () => {
  const [users, setUser] = useState([])
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;



  const [numpage, setNumpage] = useState("")
  const [userSearch, setUserSearch] = useState([])


  const [searchValue, setSearchValue] = useState("")
  const keys = ["taiKhoan", "email", "hoTen", "soDT"]
  const handleSearch = () => {
    const newUserSearch = users.filter((item) => keys.some((key) => item[key]?.toLowerCase().includes(searchValue) || null))
    setUserSearch(newUserSearch)
  }
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = userSearch.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(userSearch.length / itemsPerPage);

  const [show, setShow] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const handleClose = async () => {
    const data = await usersAPI.getUsers();
    setUser(data);
    setUserSearch(data);
    setShow(false);
    setUserDetail({});
    setIsUpdate(false);
  };
  const handleShow = () => setShow(true);

  const handlePageClick = (event) => {
    setNumpage(event.selected)
    const newOffset = (event.selected * itemsPerPage) % users.length;

    setItemOffset(newOffset);
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await usersAPI.getUsers();
        setUser(data);
        setUserSearch(data);
      } catch (error) {
        console.log(error);
      }

    })();
  }, [])


  const handleDelete = async (id) => {
    await usersAPI.deleteUser(id);
    const data = await usersAPI.getUsers();
    setUser(data);
    setUserSearch(data);
  }

  const handleUpdate = (userDetail) => {
    setUserDetail(userDetail);
    setShow(true);
    setIsUpdate(true);
  }

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
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button
              onClick={() => handleSearch()}
            >
              <FaSearch />
            </Button>
          </InputGroup>
          <Button className='btn-add' onClick={handleShow}>
            Thêm người dùng
          </Button>
          <UserModal show={show} handleClose={handleClose} userDetail={userDetail.taiKhoan ? userDetail : {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maLoaiNguoiDung: "",
            hoTen: "",
          }}
            isUpdate={isUpdate}
          />

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
            {currentItems.map((user, index) => (
              <tr key={user.taiKhoan}>
                <th>{numpage * itemsPerPage + index + 1}</th>
                <th>{user.taiKhoan}</th>
                <th>{user.hoTen}</th>
                <th>{user.email}</th>
                <th>{user.soDT}</th>
                <th>{user.maLoaiNguoiDung}</th>
                <th className="row">
                  <Button variant="outline-primary" className="col-5 m-1" onClick={() => handleUpdate(user)}><FaRegEdit /></Button>
                  <Button variant="outline-danger" className="col-5 m-1" onClick={() => handleDelete(user.taiKhoan)}><BsTrash /></Button>
                </th>



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
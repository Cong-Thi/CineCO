import React from 'react'

import { FaSearch } from 'react-icons/fa'
import {FaRegEdit} from 'react-icons/fa'
import {BsTrash} from 'react-icons/bs'

import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import UserModal from '../../../components/UserModal/UserModal'
import ReactPaginate from 'react-paginate'

import "./movieAdmin.scss"

const MovieAdmin = () => {
  return (
    <div className='movie-admin'>
      <div className="movie-admin__content">
        <div className="movie-admin__content__title">
          <div className="title-text">
          <h3>Quản lý Phim</h3>
          </div>
          <InputGroup>
            <Form.Control
              placeholder="Tìm Kiếm..."
              aria-label="search"
              aria-describedby="basic-addon1"
              // onChange = {(e)=> setUserSearch(e.target.value)}
            />
            <Button 
            // onClick={()=> handleSearch()}
            >
            <FaSearch />
            </Button>
          </InputGroup>
          <Button className='btn-add' 
          // onClick={handleShow}
          >
            Thêm Phim
          </Button>
          
        </div>
        <Table bordered hover>
      <thead>
        <tr>
          <th>Mã Phim</th>
          <th>Tên Phim</th>
          <th>Bí Danh</th>
          <th>Trailer</th>
          <th>Hình Ảnh</th>
          <th>Mô Tả</th>
          <th>Mã Nhóm</th>
          <th>Ngày khởi chiếu</th>
          <th>Đánh Giá</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
      
      </tbody>
    </Table>
  </div>
    </div>
  )
}

export default MovieAdmin
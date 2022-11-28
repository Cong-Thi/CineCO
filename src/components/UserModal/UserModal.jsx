import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const UserModal = ({show , handleClose}) => {
  return (
    <div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicTaiKhoan">
        <Form.Label>Tài Khoản:</Form.Label>
        <Form.Control type="text" placeholder="Nhập tài khoản..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicMatKhau">
        <Form.Label>Mật Khẩu:</Form.Label>
        <Form.Control type="password" placeholder="Nhập mật khẩu..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" placeholder="Nhập Email..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Số Điện Thoại:</Form.Label>
        <Form.Control type="tel" placeholder="Nhập số điện thoại..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicMaNhom">
        <Form.Label>Mã Nhóm:</Form.Label>
        <Form.Control type="text" placeholder="Nhập Mã nhóm...." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicMaLoaiNguoiDung">
        <Form.Label>Mã loại người dùng:</Form.Label>
        <Form.Control type="text" placeholder="Nhập mã loại người dùng..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicHoTen">
        <Form.Label>Họ và tên:</Form.Label>
        <Form.Control type="text" placeholder="Nhập họ và tên..." />
      </Form.Group>
    </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}

export default UserModal
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import usersManagementAPI from '../../service/usersManagementAPI';


import "./userModal.scss"

const UserModal = ({show , handleClose}) => {
  
const { 
  register, 
  handleSubmit,
  formState:{errors}, 
} = useForm({
  defaultValues:{
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "",
    hoTen: "",
  }, mode: "onTouched",
})


const onSubmit = async (values) => {
  try {
    await usersManagementAPI.addUser(values);
    handleClose();
   
  } catch (error) {
   console.log(error);
  }
};
  return (
    <div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form >
          <label htmlFor="taiKhoan">Tài Khoản</label>
          <div className={`user-form-control ${errors.taiKhoan ? "errorInput" : ""}`}>
            <input type="text"
            placeholder="Tên đăng nhập" 
            {...register("taiKhoan", {
              required: "Không được để trống",
              pattern: {
                value: /^[a-zA-Z0-9.\-_$@*!]{3,30}$/,
                message: "Tên đăng nhập không hợp lệ",
              },
            })}
            />
          </div>
          {errors.taiKhoan && (
          <p className="errorMessage">{errors.taiKhoan.message}</p>
        )}
          <label htmlFor="matKhau">Mật Khẩu</label>
          <div className={`user-form-control ${errors.matKhau ? "errorInput" : ""}`}>
            <input type="text" 
            placeholder="Mật khẩu"
            {...register("matKhau", {
              required: "Không được để trống",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  "Mật khẩu phải dài ít nhất 8 ký tự, gồm tối thiểu 1 ký tự hoa, 1 ký tự thường và 1 ký tự số",
              },
            })}/>
          </div>
          {errors.matKhau && (
          <p className="errorMessage">{errors.matKhau.message}</p>
        )}
          <label htmlFor="email">Email</label>
          <div className={`user-form-control ${errors.email ? "errorInput" : ""}`}>
            <input type="email" 
            placeholder="Email"
            {...register("email", {
              required: "Không được để trống",
              pattern: {
                value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email không hợp lệ",
              },
            })}/>
          </div>
          {errors.email && <p className="errorMessage">{errors.email.message}</p>}
          <label htmlFor="soDT">Số Điện Thoại</label>
          <div className={`user-form-control ${errors.soDt ? "errorInput" : ""}`}>
            <input type="text"
            placeholder="Số điện thoại"
            {...register("soDt", {
              required: "Không được để trống",
              pattern: {
                value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
             />
          </div>
          {errors.soDt && <p className="errorMessage">{errors.soDt.message}</p>}
          <label htmlFor="maNhom">Mã loại người dùng</label>
          <div className='user-form-control'>
            <select
            {...register("maLoaiNguoiDung")}>
              <option value="khachHang">Khách Hàng</option>
              <option value="quanTri">Quản Trị</option>
            </select>
          </div>
          <label htmlFor="hoTen">Họ tên</label>
          <div className='user-form-control'>
            <input type="text" 
            placeholder="Họ tên"
            {...register("hoTen", {
              required: "Không được để trống",
              minLength: { value: 2, message: "Tối thiểu 2 ký tự" },
              maxLength: { value: 8, message: "Tối đa 8 ký tự" },
            })}
            />
          </div>
          {errors.hoTen && <p className="errorMessage">{errors.hoTen.message}</p>}
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary"
          type='submit'
          onClick={handleSubmit(onSubmit)}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
  )
}

export default UserModal
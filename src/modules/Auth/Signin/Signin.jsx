import Reac, { useState, useEffect } from 'react'
import {useForm} from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { signin } from '../../../slices/authSlice'
import "./signin.scss"

const Signin = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    const {register, handleSubmit, formState} = useForm({
        defaultValues: {taiKhoan:"", matKhau:""},
        mode: "onTouched",
    })

    const {errors} = formState;

    const onSubmit = (values) => {
        dispatch(signin(values));
    }

    if(user){
        return <Navigate to="/" replace/>
    }
  return (
    <div className='signin container'>
        <h2>Đăng Nhập</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className='form-sign'>
            <div className='form-item'>
                <label>Tài khoản</label>
                <input {...register("taiKhoan", {
                    required: {
                        value: true,
                        message:"Tài khoản không được để trống",
                    },
                    minLength:{
                        value: 5,
                        message:"Tài khoản 5-20 ký tự",
                    },
                    maxLength: {
                        value: 20,
                        message:"Tài khoản 5-20 ký tự",
                    },
                })}/>
                <br/>
                {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}

            </div>
            <div className='form-item'>
                <label>Mật khẩu</label>
                <input {...register("matKhau", {
                    required: true,
                })}/>
                <br/>
                {errors.matKhau && <span>Mật khẩu không được để trống</span>}
            </div>
            
            <button disabled={loading}>Đăng Nhập</button>
            <div>Chưa có tài khoản ? <Link to='/Signup'>Đăng ký ngay !</Link></div>
            {error && <p>{error}</p>}
        </form>
    </div>
  )
}

export default Signin
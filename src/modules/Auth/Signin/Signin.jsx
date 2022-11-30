import React from 'react'
import {useForm} from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { signin } from '../../../slices/authSlice'

const Signin = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    const {register, handleSubmit, formState} = useForm({
        defaultValues: {taiKhoan:"", matKhau:""},
        mode: "onTouched", // Điều kiện để kích hoạt validation, mặc định là onSubmit
    })

    const {errors} = formState;

    // const taiKhoan = register("taiKhoan")
    // console.log(taiKhoan);

    const onSubmit = (values) => {
        console.log(values);
        dispatch(signin(values));
    }

    if(user){
        // Có thông tin user => đã đăng nhập => redirect về home
        return <Navigate to="/" replace/>
    }
  return (
    <div>
        <h1>Signin</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Tài khoản</label>
                {/* <input {...register("taiKhoan", {
                    required: true,
                    minLength:5,
                    maxLength: 20,
                })}/>
                {errors.taiKhoan?.type === "required" && <span>Tài khoản không được để trống</span>}
                {["minLength","maxLength"].includes(errors.taiKhoan?.type) && (
                    <span>Tài khoản 5-20 ký tự</span>
                )} */}

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
                
                {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}

            </div>
            <div>
                <label>Mật khẩu</label>
                <input {...register("matKhau", {
                    required: true,
                })}/>
                {errors.matKhau && <span>Mật khẩu không được để trống</span>}
            </div>
            <button disabled={loading}>Đăng Nhập</button>
            {error && <p>{error}</p>}
        </form>
    </div>
  )
}

export default Signin
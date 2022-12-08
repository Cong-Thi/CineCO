import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup, clearError, setIsSignUp } from '../../../slices/authSlice'
import "./signup.scss"
//import { Notification } from '@mantine/core';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const { isSignUp, messageError } = useSelector(state => state.authSlice);


    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            "taiKhoan": "",
            "matKhau": "",
            "email": "",
            "soDt": "",
            "hoTen": "",
        },
        mode: 'all',
    })

    const { errors } = formState;

    const onSubmit = async (values) => {
        dispatch(signup(values));
        navigate('/');
    }

    return (
        <div className='signup container'>
            <h2>Đăng Ký</h2>
            <form className='form-sign' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-item'>

                    <label>Tài khoản</label>
                    <input type="text" {...register('taiKhoan', {
                        required: {
                            value: true,
                            message: 'Tài khoản không được bỏ trống'
                        },
                        minLength: {
                            value: 8,
                            message: 'Tài khoản phải từ 8 - 16 kí tự'
                        },
                        maxLength: {
                            value: 16,
                            message: 'Tài khoản phải từ 8 - 16 kí tự'
                        }
                    })} />

                </div>
                {errors.taiKhoan && (<span>{errors.taiKhoan.message}</span>)}

                <div className='form-item'>
                    <label>Mật khẩu</label>
                    <input type="password" {...register('matKhau', {
                        required: {
                            value: true,
                            message: 'Mật khẩu không được bỏ trống'
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Mật khẩu phải tối thiểu 8 ký tự ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt"
                        }
                    })} />
                </div>
                {errors.matKhau && (<span>{errors.matKhau.message}</span>)}

                <div className='form-item'>
                    <label>Email</label>
                    <input type="text" {...register('email', {
                        required: {
                            value: true,
                            message: 'Email không được bỏ trống'
                        },
                        pattern: {
                            value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                            message: 'Email không đúng định dạng'
                        }
                    })} />

                </div>
                {errors.email && (<span>{errors.email.message}</span>)}

                <div className='form-item'>
                    <label>Số điện thoại</label>
                    <input type="" {...register('soDt', {
                        required: {
                            value: true,
                            message: 'Số điện thoại không được bỏ trống'
                        },
                        pattern: {
                            value: /[0-9]{10,16}/,
                            message: 'Số điện thoại phải là số, từ 10 - 16 kí số'
                        }
                    })} />

                </div>
                {errors.soDt && (<span>{errors.soDt.message}</span>)}

                <div className='form-item'>
                    <label>Họ tên</label>
                    <input type="text" {...register('hoTen', {
                        required: {
                            value: true,
                            message: 'Họ tên không được bỏ trống'
                        },
                        minLength: {
                            value: 5,
                            message: 'Họ tên phải từ 5 - 16 kí tự'
                        },
                        maxLength: {
                            value: 16,
                            message: 'Họ tên phải từ 5 - 16 kí tự'
                        }
                    })} />

                </div>
                {errors.hoTen && (<span>{errors.hoTen.message}</span>)}

                <div className='form-button'>
                    <button>Tạo Tài Khoản</button>
                    <div>Đã có tài khoản ? <Link to='/signin'>Đăng nhập ngay !</Link></div>
                </div>
            </form>
        </div>
    )
}

export default SignUp;
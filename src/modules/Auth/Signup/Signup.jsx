import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../../../slices/authSlice'

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            "taiKhoan": "",
            "matKhau": "",
            "email": "",
            "soDt": "",
            "hoTen": ""
        },
        mode: 'all',
    })

    const { errors } = formState;

    const onSubmit = (values) => {
        console.log(values);
        dispatch(signUp(values));
        navigate('/');
    }

    return (
        <>
            <h2>Đăng Ký</h2>
                <form className='formLogin' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        
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
                            {errors.taiKhoan && (<p>{errors.taiKhoan.message}</p>)}
                        

                        
                            <label>Mật khẩu</label>
                            <input type="password" {...register('matKhau', {
                                required: {
                                    value: true,
                                    message: 'Mật khẩu không được bỏ trống'
                                },
                                pattern : {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: 'Mật khẩu phải tối thiểu 8 ký tự ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt'
                                }
                            })} />
                            {errors.matKhau && (<p>{errors.matKhau.message}</p>)}
                        

                        
                            <label>Email</label>
                            <input type="text" {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Email không được bỏ trống'
                                },
                                pattern : {
                                    value : /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                                    message: 'Email không đúng định dạng'
                                }
                            })} />
                            {errors.email && (<p>{errors.email.message}</p>)}
                        

                        
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
                            {errors.soDt && (<p>{errors.soDt.message}</p>)}
                        

                        
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
                            {errors.hoTen && (<p>{errors.hoTen.message}</p>)}
                        
                    </div>
                    <div>
                        <button>Tạo Tài Khoản</button>
                        <div>Đã có tài khoản ? <Link to='/signin'>Đăng nhập ngay !</Link></div>
                    </div>
                </form>
        </>
    )
}

export default SignUp;
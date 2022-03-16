import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLoginUserMutation } from "../../services/user";

export default function Login() {

    const [loginUser, { isLoading, data }] = useLoginUserMutation();
    

    const handleLogin = async (data) => {
        await loginUser(data).unwrap();
        console.log(data);
    }

    const formSchema = Yup.object().shape({
        email: Yup.string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format'),
        password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters')
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (   
        <div className='form-container'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.email?.message}</div>
                
                <input type='password' id='password' name='password' placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.password?.message}</div>

                <button type='submit' className='login-btn'>Login</button>
            </form>

            <h1>{data && data.first_name}</h1>
        </div>
    )
}
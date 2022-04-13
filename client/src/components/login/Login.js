import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { loginUser } from "../../userSlice";
import { useRegisterAdminMutation } from "../../services/admin";
import RegisterConfirmation from './RegisterConfirmation';
import voterLogo from '../../voterlogo.png'



export default function Login() {

    const [ registerAdmin ] = useRegisterAdminMutation()

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ registerClick, setRegisterClick ] = useState(false);
    const  [ registerModal, setRegisterModal ] = useState(false);
    const [ message, setMessage ] = useState(null);

    const handleLogin = async (data) => {
        try {
            dispatch(loginUser(data)).then(() => navigate('/'));
        } catch (error) {
            console.log(error);
        }
    }

    const handleRegister = async (data) => {
        try {
            const response = await registerAdmin(data).unwrap();
            console.log(response);
            setMessage(response.message);
            setRegisterModal(true);
            setRegisterClick(false);
        } catch (error) {
            console.log(error);
        }
    }

    const formSchema = registerClick ? Yup.object().shape({
        first_name: Yup.string()
        .required('First Name is required')
        .matches(/^[a-zA-Z]+$/, 'First Name can only contain upper and lower case letters'),
        last_name: Yup.string()
        .required('Last Name is required')
        .matches(/^[a-zA-Z]+$/, 'Last Name can only contain upper and lower case letters'),
        email: Yup.string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format')
    }) : Yup.object().shape({
        email: Yup.string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format'),
        password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters')
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (   
        <div id='login-container'>
            {registerModal && <RegisterConfirmation message={message} setRegisterModal={setRegisterModal} />}
            {registerClick && 
            <>
            <div id='register'>
                <div className='logo-header-flex'>
                    <img className='voter-logo' alt='voter logo' src={voterLogo}></img>
                    <h1>Register</h1>
                </div>    
                    <p>For Admin Users Only</p>
                    <form onSubmit={handleSubmit(handleRegister)}>

                        <input type='first_name' id='first_name' name='first_name' placeholder="First Name" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.first_name?.message}</div>

                        <input type='last_name' id='last_name' name='last_name' placeholder="Last Name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.last_name?.message}</div>

                        <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback' data-testid='invalid-email'>{errors.email?.message}</div>
                        
                        <div className='two-button-flex'>
                            <button className='login-btn' onClick={() => setRegisterClick(false)}>Back</button>
                            <button type='submit' className='login-btn'>Register</button>
                        </div>  
                    </form>
                </div>
                <div className='testing-note important-note'>
                    <p>Testing: Registering will send real email to account entered.</p>
                </div>
            </>
            }
            
            {!registerClick && 
            <>
            <div id='login'data-testid='login'>
                <div className='logo-header-flex'>
                    <img className='voter-logo' alt='voter logo' src={voterLogo}></img>
                    <h1>Login</h1>
                </div>  
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                    <div className='invalid-feedback' data-testid='invalid-email'>{errors.email?.message}</div>
                    
                    <input type='password' id='password' name='password' placeholder="Password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback' data-testid='invalid-password'>{errors.password?.message}</div>

                    <div className='two-button-flex'>
                        <button type='submit' className='login-btn'>Login</button>
                        <button className='login-btn' onClick={() => setRegisterClick(true)}>Register</button>
                    </div>
                    
                </form>
            </div>
            <div className='testing-note'>
                <h2>Test Logins</h2>
                <p>Email: test-admin@gmail.com Password: testAdmin</p>
                <p>Email: test-voter@gmail.com Password: testVoter</p>
                <p>Email: test-candidate@gmail.com Password: testCand</p>
            </div>
            </>
            }
        </div>
    )
}
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { selectUser, amendUser } from '../../../userSlice'

export default function ChangeEmail() {

    const user = useSelector(selectUser)

    const dispatch = useDispatch()
    const [ changeEmailClick, setChangeEmailClick ] = useState(false);

    const changeEmailHandler = (data) => {
        dispatch(amendUser({
            id: user.id,
            role: user.role,
            body: data
        }))
        setChangeEmailClick(false)
    }
    
    const formSchema = Yup.object().shape({
        email: Yup.string()
        .required('Email is required')
        .email()
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);
    
    
    return (
        <div id='change-email'>
            <p>Email:</p>
            {!changeEmailClick && <p>{user && user.email}</p>}
            {!changeEmailClick && <button className='main-btn' onClick={() => changeEmailClick ? setChangeEmailClick(false) : setChangeEmailClick(true)}>Edit</button>}
            {changeEmailClick && 
            <form id='change-email-form' onSubmit={handleSubmit(changeEmailHandler)}>
                <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}></input>
                {/* <div className='invalid-feedback'>{errors.email?.message}</div> */}
                <button type='submit' className='submit-btn'>Submit</button> 
                <button onClick={() => changeEmailClick ? setChangeEmailClick(false) : setChangeEmailClick(true)} className='cancel-btn'>Cancel</button> 
            </form>
            }  
        </div>
    )
}
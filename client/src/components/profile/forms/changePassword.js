import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { selectUser, changePassword } from '../../../userSlice'
import * as Yup from 'yup';

export default function ChangePasswordForm({ setChangePasswordClick, toast }) {

    
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const changePasswordHandler = (data) => {
        const obj = {current_password: data.current_password, new_password: data.new_password }
        
        dispatch(changePassword({
                id: user.id,
                role: user.role,
                body: obj
            }))
            .then(unwrapResult)
            .then(() => {
                setChangePasswordClick(false);
                toast('Password Changed Successfully')
            })
            .catch(() => {
                setChangePasswordClick(false);
                toast('There was a problem. Password was not changed.');
            })
    }
    
    const formSchema = Yup.object().shape({
        current_password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters'),
        confirm_current_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('current_password')], 'Passwords must match'),
        new_password: Yup.string()
        .required('Password is required')
        .min(7, 'Password length at least 7 characters')
        .max(20, 'Password length no more than 20 characters')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/, 'Password must have at least one lower case letter, one uppercase letter and one number'),
        confirm_new_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('new_password')], 'Passwords must match'),
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);
    
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => setChangePasswordClick(false)}>+</div>
                <h2>Change Password</h2>
                <form id='change-password-form' onSubmit={handleSubmit(changePasswordHandler)}>
                    <input type='password' id='current_password' name='current_password' placeholder="Current Password" {...register('current_password')} className={`form-control ${errors.current_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.current_password?.message}</div>
                    
                    <input type='password' id='confirm_current_password' name='confirm_current_password' placeholder="Confirm Current Password" {...register('confirm_current_password')} className={`form-control ${errors.confirm_current_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.confirm_current_password?.message}</div>

                    <input type='password' id='new_password' name='new_password' placeholder="New Password" {...register('new_password')} className={`form-control ${errors.new_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.new_password?.message}</div>
                    
                    <input type='password' id='confirm_new_password' name='confirm_new_password' placeholder="Confirm New Password" {...register('confirm_new_password')} className={`form-control ${errors.confirm_new_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.confirm_new_password?.message}</div>

                    <button id='submit' type='submit' className='submit-btn'>Submit</button>
                    <button onClick={() => setChangePasswordClick(false)} className='cancel'>Cancel</button>  
                </form>
            </div>
        </div>
    )
}
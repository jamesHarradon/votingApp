import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { selectUser, amendUser } from '../../../userSlice'

export default function ChangeEmail({ setChangeEmailClick, toast }) {

    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const changeEmailHandler = (data) => {
        try {
            dispatch(amendUser({
                id: user.id,
                role: user.role,
                body: data
            }));
            setChangeEmailClick(false);
            toast('Email Changed Successfully')
        } catch (error) {
            setChangeEmailClick(false);
            toast('There was a problem. Email was not changed.');
            console.log(error)
        }
    }
    
    const formSchema = Yup.object().shape({
        email: Yup.string()
        .required('Email is required')
        .email()
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);
    
    
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => setChangeEmailClick(false)}>+</div>
                <h2>Change Email</h2>
                <form id='change-email-form' onSubmit={handleSubmit(changeEmailHandler)}>
                    <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.email?.message}</div>
                    <button type='submit' className='submit-btn'>Submit</button> 
                    <button onClick={() => setChangeEmailClick(false)} className='cancel'>Cancel</button> 
                </form>
            </div>
        </div>
         
    )
}
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { selectUser, amendUser } from '../../../userSlice'


export default function ChangeName() {

    const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const [ changeNameClick, setChangeNameClick ] = useState(false);

    const changeNameHandler = (data) => {
        dispatch(amendUser({
            id: user.id, 
            role: user.role,
            body: data
        }))
        setChangeNameClick(false);
    }
    
    const formSchema = Yup.object().shape({
        first_name: Yup.string()
        .required('First Name is required')
        .matches(/^[a-zA-Z]+$/, 'First Name can only contain upper and lower case letters'),
        last_name: Yup.string()
        .required('Last Name is required')
        .matches(/^[a-zA-Z]+$/, 'Last Name can only contain upper and lower case letters')
    });

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);
    
    
    return (
        <div id='change-name'>
            <p>Name:</p> 
            {!changeNameClick &&
            <div id='name'> 
                <p>{user && user.first_name}</p>
                <p>{user && user.last_name}</p>
            </div>
            }
            {!changeNameClick && <button className='edit' onClick={() => changeNameClick ? setChangeNameClick(false) : setChangeNameClick(true)}>Edit</button>}
            {changeNameClick && 
            <form id='change-name-form' onSubmit={handleSubmit(changeNameHandler)}>
                <input type='first_name' id='first_name' name='first_name' placeholder="First" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                {/* <div className='invalid-feedback'>{errors.first_name?.message}</div> */}
                <input type='last_name' id='last_name' name='last_name' placeholder="Last" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}></input>
                {/* <div className='invalid-feedback'>{errors.last_name?.message}</div> */}
                <button type='submit' className='submit-btn'>Submit</button> 
                <button onClick={() => changeNameClick ? setChangeNameClick(false) : setChangeNameClick(true)} className='cancel'>Cancel</button> 
            </form>
            }
        </div>
    )
}
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function Profile() {

    const [ changePasswordClick, setChangePasswordClick ] = useState(false);

    const changePasswordHandler = (data) => {
        //dispatch returns a promise which you can manually reject in the thunk
        // dispatch(changePassword({userId, ...data}))
        // .then(() => {
        //     alert('Password Changed Successfully');
        //     setChangePasswordClick(false);
        // }).catch(() => alert('There was a problem. Password was not changed.'));
    }

    const user = [{id: 1, first_name: 'Bob', last_name: 'Smith', election: 'Position of Union Vice President at Twitter'}];

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
    const { changePassword, handleSubmit, formState:{ errors } } = useForm(formOptions);

    //extra - look into flow for changing email address for user
    // - may need to confirm email address with new password?
    return (
        <div className="profile">
            <p>Name: {`${user.first_name} ${user.last_name}`}</p>
            <p>Email: {user.email}</p><button>Edit</button>
        
            {!changePasswordClick &&
            <button onClick={() => setChangePasswordClick(true)}>Change Password</button>
            }
            {changePasswordClick && 
            <div className='change-password-form'>
                <form onSubmit={handleSubmit(changePasswordHandler)}>
                    
                    <input type='password' id='current_password' name='current_password' placeholder="Current Password" {...changePassword('current_password')} className={`form-control ${errors.current_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.current_password?.message}</div>
                    
                    <input type='password' id='confirm_current_password' name='confirm_current_password' placeholder="Confirm Current Password" {...changePassword('confirm_current_password')} className={`form-control ${errors.confirm_current_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.confirm_current_password?.message}</div>

                    <br></br>
                    
                    <input type='password' id='new_password' name='new_password' placeholder="New Password" {...changePassword('new_password')} className={`form-control ${errors.new_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.new_password?.message}</div>
                    
                    <input type='password' id='confirm_new_password' name='confirm_new_password' placeholder="Confirm New Password" {...changePassword('confirm_new_password')} className={`form-control ${errors.confirm_new_password ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.confirm_new_password?.message}</div>
                    
                    <br></br>
                    <button type='submit' className='change-password-btn'>Change Password</button> 
                </form>
            </div>
            }
        </div>

        
    )
}
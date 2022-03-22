import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";

import ChangeEmail from "./forms/changeEmail";
import ChangeName from "./forms/changeName";
import ChangePasswordForm from "./forms/changePassword";

export default function Profile() {

    const user = useSelector(selectUser)

    const [ changeNameClick, setChangeNameClick ] = useState(false);
    const [ changeEmailClick, setChangeEmailClick ] = useState(false);
    const [ changePasswordClick, setChangePasswordClick ] = useState(false);
    
    //extra - look into flow for changing email address for user
    // - may need to confirm email address with new password?

    return (
        <div id="profile">
            <div id='change-name'>
                <p>Name:</p> 
                <div id='name'> 
                    <p>{user && user.first_name}</p>
                    <p>{user && user.last_name}</p>
                </div>
                <button className='edit' onClick={() => setChangeNameClick(true)}>Edit</button>
            </div>
            {changeNameClick && <ChangeName setChangeNameClick={setChangeNameClick} toast={toast} />}
            <div id='change-email'>
                <p>Email:</p>
                <p>{user && user.email}</p>
                <button className='edit' onClick={() => setChangeEmailClick(true)}>Edit</button>
            </div>
            {changeEmailClick && <ChangeEmail setChangeEmailClick={setChangeEmailClick} toast={toast} />}
            <div id='change-password'>
                <p>Password:</p>
                <p>********</p>
                <button className='edit' onClick={() => setChangePasswordClick(true)}>Change Password</button>
            </div>
            {changePasswordClick && <ChangePasswordForm setChangePasswordClick={setChangePasswordClick} toast={toast} />}
            <ToastContainer 
                hideProgressBar={true}
                autoClose={3000}
            />
        </div>
    )
}
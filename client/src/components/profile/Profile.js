import React, { useState } from "react";


import ChangeEmail from "./forms/changeEmail";
import ChangeName from "./forms/changeName";
import ChangePasswordForm from "./forms/changePassword";

export default function Profile() {

    const [ changePasswordClick, setChangePasswordClick ] = useState(false);
    
    //extra - look into flow for changing email address for user
    // - may need to confirm email address with new password?

    return (
        <div id="profile">
            <ChangeName />
            <ChangeEmail />
            <div id='change-password'>
                <p>Password:</p>
                <p>********</p>
                <button className='main-btn' onClick={() => changePasswordClick ? setChangePasswordClick(false) : setChangePasswordClick(true)}>Change Password</button>
            </div>
            {changePasswordClick && <ChangePasswordForm setChangePasswordClick={setChangePasswordClick} />}
        </div>
    )
}
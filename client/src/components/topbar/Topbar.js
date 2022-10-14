import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../userSlice'


export default function Topbar() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logoutUser()).then(() => navigate('/login'));
    }

    return (
        <div id='topbar'>
            <h1 id='heading'>Voter</h1>
            <div className='topbar-links'>
                <Link className='link' to='/profile'>Profile</Link>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}
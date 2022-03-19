import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../userSlice'

export default function Topbar() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logoutUser())
    }

    return (
        <div id='topbar'>
            <h1 id='heading'>Jims Voting App</h1>
            <div className='topbar-links'>
                <Link className='link' to='/profile'>Profile</Link>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}
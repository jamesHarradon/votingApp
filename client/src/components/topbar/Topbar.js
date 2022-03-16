import React from 'react'
import { Link } from 'react-router-dom'

export default function Topbar() {


    const logoutHandler = () => {
        //dispatch logout route
    }

    return (
        <div id='topbar'>
            <h1 id='heading'>Jims Voting App</h1>
            <div className='topbar-links'>
                <Link to='/profile'>Profile</Link>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
    )
}
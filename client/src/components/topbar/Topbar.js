import React from 'react'
import { Link } from 'react-router-dom'

export default function Topbar() {


    return (
        <div id='topbar'>
            <h1>Jims Voting App</h1>
            <div>
                <Link to='/profile'>Profile</Link>
                <Link to='/logout'>Logout</Link>
            </div>
        </div>
    )
}
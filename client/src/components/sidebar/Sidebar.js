import React from "react";
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const user = 'candidate' //this will get users role from token, saved in state after login

    return (
        <div id='sidebar'>
            <Link to='/' class='sidebar-link'>Dashboard</Link>
            <Link to={user === 'voter' ? '/ballot-card' : '/voters'} class='sidebar-link'>{user === 'voter' ? 'Ballot Card' : 'Voters'}</Link>
            <Link to={user === 'candidate' ? '/manifesto' : '/candidates'} class='sidebar-link'>{user === 'candidate' ? 'Manifesto' : 'Candidates'}</Link>
            <Link to='/election' class='sidebar-link'>Election</Link>
            <Link to='/results' class='sidebar-link'>Results</Link>
        </div>
    )
}
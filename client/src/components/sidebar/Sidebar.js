import React from "react";
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const user = 'voter' //this will get users role from token, saved in state after login

    return (
        <div id='sidebar'>
            <Link class='sidebar-link'>Dashboard</Link>
            <Link class='sidebar-link'>{user === 'voter' ? 'Ballot Card' : 'Voters'}</Link>
            <Link class='sidebar-link'>{user === 'candidate' ? 'Manifesto' : 'Candidates'}</Link>
            <Link class='sidebar-link'>Election</Link>
            <Link class='sidebar-link'>Results</Link>
        </div>
    )
}
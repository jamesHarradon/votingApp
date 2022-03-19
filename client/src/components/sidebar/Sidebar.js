import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectUser } from '../../userSlice';


export default function Sidebar() {

    const user = useSelector(selectUser);

    return (
        <div id='sidebar'>
            <Link to='/' className='sidebar-link'>Dashboard</Link>
            <Link to={user.role === 'voter' ? '/ballot-card' : '/voters'} className='sidebar-link'>{user.role === 'voter' ? 'Ballot Card' : 'Voters'}</Link>
            <Link to={user.role === 'candidate' ? `/manifesto/${user.id}/${user.election_id}` : '/candidates'} className='sidebar-link'>{user.role === 'candidate' ? 'Manifesto' : 'Candidates'}</Link>
            <Link to='/election' className='sidebar-link'>Election</Link>
            <Link to='/results' className='sidebar-link'>Results</Link>
        </div>
    )
}
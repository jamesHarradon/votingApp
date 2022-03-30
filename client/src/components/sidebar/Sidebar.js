import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { selectUser } from '../../userSlice';


export default function Sidebar() {

    const user = useSelector(selectUser);

    const addSelected = (id) => {   
        const sidebarLinks = Array.from(document.getElementsByClassName('sidebar-link'));
        sidebarLinks.map(link => link.id === id ? link.className = 'sidebar-link sidebar-selected' : link.className = 'sidebar-link')
    }

    return (
        <div id='sidebar'>
            <Link id='1' onClick={() => addSelected('1')} to='/' className='sidebar-link'>Dashboard</Link>
            <Link id='2' onClick={() => addSelected('2')} to={user.role === 'voter' ? '/ballot-card' : '/voters'} className='sidebar-link'>{user.role === 'voter' ? 'Ballot Card' : 'Voters'}</Link>
            <Link id='3' onClick={() => addSelected('3')} to={user.role === 'candidate' ? `/manifesto/${user.id}/${user.election_id}` : '/candidates'} className='sidebar-link'>{user.role === 'candidate' ? 'Manifesto' : 'Candidates'}</Link>
            <Link id='4' onClick={() => addSelected('4')} to='/election' className='sidebar-link'>Election</Link>
            <Link id='5' onClick={() => addSelected('5')} to='/results' className='sidebar-link'>Results</Link>
        </div>
    )
}
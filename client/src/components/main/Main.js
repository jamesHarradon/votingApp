import React from "react";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "../dashboard/Dashboard";
import BallotCard from "../ballotCard/BallotCard";
import Voters from "../voters/Voters";
import Candidates from "../candidates/Candidates";
import Manifesto from "../manifesto/Manifesto";
import Election from "../election/Election";
import Results from "../results/Results";
import Profile from "../profile/Profile";
import Login from "../login/Login";


export default function Main() {

    // user variable simulates a user has logged in
    const user = true;

    return (
        <div id='main'>
            {user ? 
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/profile/:id' element={<Profile />} />
                <Route path='/ballot-card' element={<BallotCard />} />
                <Route path='/voters' element={<Voters />} />
                <Route path='/candidates' element={<Candidates />} />
                {/*add /:id to manifesto route*/}
                <Route path='/manifesto/:candidateId/:electionId' element={<Manifesto />} />
                <Route path='/election' element={<Election />} />
                <Route path='/results' element={<Results />} />
                <Route path='/profile' element={<Profile />} />
            </Routes> 
            :
            <Routes>
                <Route path='/login' element={<Login />} />
            </Routes>
            }     
        </div>
    )
}
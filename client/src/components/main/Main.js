import React, { Suspense, lazy } from "react";
import { Routes, Route } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import Login from "../login/Login";
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";

const Dashboard =lazy(() => import('../dashboard/Dashboard'));
const BallotCard = lazy(() => import('../ballotCard/BallotCard'));
const Voters = lazy(() => import('../voters/Voters'));
const Candidates = lazy(() => import('../candidates/Candidates'));
const Manifesto = lazy(() => import('../manifesto/Manifesto'));
const Election = lazy(() => import('../election/Election'));
const Results = lazy(() => import('../results/Results'));
const Profile = lazy(() => import('../profile/Profile'));

export default function Main() {

    const user = useSelector(selectUser);

    return (
        <div id='main'>
            {user ? 
            <Suspense fallback={<div className='loading-icon'><CircularProgress /></div>}>
                <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/profile/:id' element={<Profile />} />
                        <Route path='/ballot-card' element={<BallotCard />} />
                        <Route path='/voters' element={<Voters />} />
                        <Route path='/candidates' element={<Candidates />} />
                        <Route path='/manifesto/:candidateId/:electionId' element={<Manifesto />} />
                        <Route path='/election' element={<Election />} />
                        <Route path='/results' element={<Results />} />
                        <Route path='/profile' element={<Profile />} />
                </Routes> 
            </Suspense>
            :
            <Routes>
                <Route path='/login' element={<Login />} />
            </Routes>
            } 
        </div>
    )
}
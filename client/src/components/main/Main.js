import React from "react";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "../dashboard/Dashboard";
import BallotCard from "../ballotCard/BallotCard";
import Voters from "../voters/Voters";
import Candidates from "../candidates/Candidates";
import Manifesto from "../manifesto/Manifesto";
import Election from "../election/Election";
import Results from "../results/Results";


export default function Main() {
    return (
        <div id='main'>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/ballot-card' element={<BallotCard />} />
                <Route path='/voters' element={<Voters />} />
                <Route path='/candidates' element={<Candidates />} />
                <Route path='/manifesto' element={<Manifesto />} />
                <Route path='/election' element={<Election />} />
                <Route path='/results' element={<Results />} />
            </Routes>   
        </div>
    )
}
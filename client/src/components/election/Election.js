import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from '../../userSlice'
import AddElectionForm from "./addElectionForm";
import AdminElectionsTableBody from "./adminElectionsTableBody";
import VotersElectionsTableBody from "./votersElectionsTableBody";
import CandidateElectionsTableBody from "./candidateElectionsTableBody";

export default function Election() {

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';
    const isVoter = user.role === 'voter';
    const isCandidate = user.role === 'candidate';

    return (
        <div id='election'>
            {isAdmin && <AddElectionForm /> }
            <div className='table-fixed-head'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Election</th>
                            <th>Date</th>
                            <th>Candidates</th>
                            <th>Voters</th>
                            {isAdmin && <th colspan='2'>Action</th>}
                        </tr>
                    </thead>
                    {isAdmin && <AdminElectionsTableBody />}
                    {isVoter && <VotersElectionsTableBody />}
                    {isCandidate && <CandidateElectionsTableBody />}
                </table>
            </div>
        </div>
    )
}
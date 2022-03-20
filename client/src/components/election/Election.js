import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { selectUser } from '../../userSlice'
import AddEditElectionForm from "./addEditElectionForm";
import AdminElectionsTableBody from "./adminElectionsTableBody";
import VotersElectionsTableBody from "./votersElectionsTableBody";
import CandidateElectionsTableBody from "./candidateElectionsTableBody";

export default function Election() {
    
    const [ addElectionClick, setAddElectionClick ] = useState(false);
    const [ editElectionClick, setEditElectionClick ] = useState(false);
    const [ editId, setEditId ] = useState(null);

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';
    const isVoter = user.role === 'voter';
    const isCandidate = user.role === 'candidate';

    return (
        <div id='election'>
            {isAdmin &&
            <button className='add-btn' onClick={() => addElectionClick ? setAddElectionClick(false) : setAddElectionClick(true)}>Add Election</button> 
            }
            {addElectionClick && <AddEditElectionForm setAddElectionClick={setAddElectionClick} toast={toast} />}
            {editElectionClick && <AddEditElectionForm setClick={setEditElectionClick} toast={toast} isAdd={false} editId={editId} />}
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
                    {isAdmin && <AdminElectionsTableBody toast={toast} setEditElectionClick={setEditElectionClick} setEditId={setEditId} />}
                    {isVoter && <VotersElectionsTableBody />}
                    {isCandidate && <CandidateElectionsTableBody />}
                </table>
            </div>
            <ToastContainer 
                hideProgressBar={true}
                autoClose={3000}
            />
        </div>
    )
}
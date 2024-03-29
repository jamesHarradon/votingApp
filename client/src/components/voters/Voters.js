import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { selectUser } from '../../userSlice';
import AddEditVoterForm from "./addEditVoterForm";
import AdminVotersTableBody from "./adminVotersTableBody";
import CandidatesVotersTableBody from "./candidatesVotersTableBody";
import AdminDropDown from "../dashboard/adminDropDown/adminDropDown";

export default function Voters() {

    const [ addVoterClick, setAddVoterClick ] = useState(false);
    const [ editVoterClick, setEditVoterClick ] = useState(false);
    const [ editId, setEditId ] = useState(null);
    const [ electionFilterId, setElectionFilterId ] = useState(null);
    const [ showAll, setShowAll ] = useState(true);


    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';
    const hasElections = user.role !== 'candidate' && user.election_ids.length > 0;
    const isAdminOrVoter = user.role === 'voter' || user.role === 'admin';


    return (
        <div id='voters'>
            {isAdminOrVoter &&
            <div className='filter-container'>
                <AdminDropDown setElectionId={setElectionFilterId} showDefaultOption={true} />
                <button onClick={() => setShowAll(true)}>Show All</button>
                <button className='add-btn' onClick={() => addVoterClick ? setAddVoterClick(false) : setAddVoterClick(true)}>Add Voter</button>
            </div>
            }
            
            {addVoterClick && <AddEditVoterForm setClick={setAddVoterClick} toast={toast} isAdd={true} />}
            {editVoterClick && <AddEditVoterForm setClick={setEditVoterClick} toast={toast} isAdd={false} editId={editId} />}
            <div className='table-fixed-head'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Election</th>
                            {isAdmin && <th colSpan='2'>Action</th>}
                        </tr>
                    </thead>
                    {isAdmin && hasElections && 
                    <AdminVotersTableBody toast={toast} setEditVoterClick={setEditVoterClick} setEditId={setEditId} electionFilterId={electionFilterId} showAll={showAll} setShowAll={setShowAll}/> 
                    }
                    {isAdmin && !hasElections &&
                    <></>
                    }
                    {!isAdmin &&
                    <CandidatesVotersTableBody /> 
                    }
                </table>
            </div>
            <ToastContainer 
                hideProgressBar={true}
                autoClose={3000}
                toastStyle={{ backgroundColor: '#ff9b29', color: 'white'}}
            />
        </div>
    )
}
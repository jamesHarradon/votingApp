import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { selectUser } from '../../userSlice'
import AddEditVoterForm from "./addEditVoterForm";
import AdminVotersTableBody from "./adminVotersTableBody";
import CandidatesVotersTableBody from "./candidatesVotersTableBody";

export default function Voters() {

    const [ addVoterClick, setAddVoterClick ] = useState(false);
    const [ editVoterClick, setEditVoterClick ] = useState(false);
    const [ editId, setEditId ] = useState(null);

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';

    return (
        <div id='voters'>
            {isAdmin &&
            <button className='add-btn' onClick={() => addVoterClick ? setAddVoterClick(false) : setAddVoterClick(true)}>Add Voter</button> 
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
                            {isAdmin && <th colspan='2'>Action</th>}
                        </tr>
                    </thead>
                    {isAdmin ? 
                    <AdminVotersTableBody toast={toast} setEditVoterClick={setEditVoterClick} setEditId={setEditId} /> 
                    :
                    <CandidatesVotersTableBody /> }
                </table>
            </div>
            <ToastContainer 
                hideProgressBar={true}
                autoClose={3000}
            />
        </div>
    )
}
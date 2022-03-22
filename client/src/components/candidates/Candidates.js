import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import AddEditCandidateForm from './addEditCandidateForm'
import { selectUser } from '../../userSlice'
import AdminCandidatesTableBody from "./adminCandidatesTableBody";
import VoterCandidatesTableBody from "./voterCandidatesTableBody";


export default function Candidates() {

    const [ addCandidateClick, setAddCandidateClick ] = useState(false);
    const [ editCandidateClick, setEditCandidateClick ] = useState(false);
    const [ editId, setEditId ] = useState(null);

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';



    return (
        <div id='candidates'>
            {isAdmin &&
            <button className='add-btn' onClick={() => addCandidateClick ? setAddCandidateClick(false) : setAddCandidateClick(true)}>Add Candidate</button> 
            }
            {addCandidateClick && <AddEditCandidateForm setClick={setAddCandidateClick} toast={toast} isAdd={true} />}
            {editCandidateClick && <AddEditCandidateForm setClick={setEditCandidateClick} toast={toast} isAdd={false} editId={editId} />}
            <div className='table-fixed-head'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Election</th>
                            {isAdmin ? <th colSpan='3'>Action</th> : <th>Action</th> }

                        </tr>
                    </thead>
                    {isAdmin ? 
                    <AdminCandidatesTableBody toast={toast} setEditCandidateClick={setEditCandidateClick} setEditId={setEditId} />
                    :
                    <VoterCandidatesTableBody />
                    } 
                </table>
            </div>
            <ToastContainer 
                hideProgressBar={true}
                autoClose={3000}
            />
        </div>
    )
}
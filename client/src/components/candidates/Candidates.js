import React from "react";
import { useSelector } from "react-redux";
import AddCandidateForm from './addCandidateForm'
import { selectUser } from '../../userSlice'
import AdminCandidatesTableBody from "./adminCandidatesTableBody";
import VoterCandidatesTableBody from "./voterCandidatesTableBody";


export default function Candidates() {

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';

    return (
        <div id='candidates'>
            {isAdmin && <AddCandidateForm />}
            <div className='table-fixed-head'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Election</th>
                            {isAdmin ? <th colspan='3'>Action</th> : <th>Action</th> }

                        </tr>
                    </thead>
                    {isAdmin ? 
                    <AdminCandidatesTableBody />
                    :
                    <VoterCandidatesTableBody />
                    } 
                </table>
            </div>
        </div>
    )
}
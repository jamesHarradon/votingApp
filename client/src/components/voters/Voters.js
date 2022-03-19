import React from "react";
import { useSelector } from 'react-redux'
import { selectUser } from '../../userSlice'
import AddVoterForm from "./addVoterForm";
import AdminVotersTableBody from "./adminVotersTableBody";
import CandidatesVotersTableBody from "./candidatesVotersTableBody";

export default function Voters() {

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';

    return (
        <div id='voters'>
            {isAdmin && <AddVoterForm />}
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
                    <AdminVotersTableBody /> 
                    :
                    <CandidatesVotersTableBody /> }
                </table>
            </div>
        </div>
    )
}
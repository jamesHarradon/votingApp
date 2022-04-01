import React from "react";
import { useSelector } from "react-redux";
import { useGetAllElectionsQuery } from "../../../services/election";
import { selectUser } from "../../../userSlice";

export default function AdminDropDown({ setElectionId, showDefaultOption }) {

    const user = useSelector(selectUser);
    const { data: elections } = useGetAllElectionsQuery({id: user.id, role: user.role});

    return (
        <div id='election-select'>
            <label htmlFor="election">Filter By Election:</label>
            <select id='election-select' name='election' defaultValue={showDefaultOption ? 'all' : null} onChange={(e) => {setElectionId(e.target.value)}}>
                {showDefaultOption && <option value='all'disabled>Select Election</option>}
                {elections && elections.map(election => (
                    <option key={election.id} id={election.id} value={election.id}>{election.name}</option>
                ))}
            </select>
        </div>
    )
}
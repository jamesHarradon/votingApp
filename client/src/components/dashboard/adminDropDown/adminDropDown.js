import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAllElectionsQuery } from "../../../services/election";
import { selectUser } from "../../../userSlice";

export default function AdminDropDown({ setElectionId }) {

    const user = useSelector(selectUser);
    const { data: elections } = useGetAllElectionsQuery({id: user.id, role: user.role});

    return (
        <div id='election-select'>
            <label htmlFor="election">Filter By Election:</label>
            <select id='election-select' name='election' onChange={(e) => {setElectionId(e.target.value)}}>
                {elections && elections.map(election => (
                    <option key={election.id} id={election.id} value={election.id}>{election.name}</option>
                ))}
            </select>
        </div>
    )
}
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetElectionsQuery } from "../../../services/election";
import { selectUser } from "../../../userSlice";

export default function AdminDropDown({ setElectionId }) {

    const admin = useSelector(selectUser);

    const { data: elections } = useGetElectionsQuery(admin.id);
    return (
        <select id='election-select' name='election' onChange={(e) => {setElectionId(e.target.value)}}>
            {elections && elections.map(election => (
                <option id={election.id} value={election.id}>{election.name}</option>
            ))}     
        </select> 
    )
}
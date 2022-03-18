import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetElectionQuery, useGetElectionsQuery } from '../../../services/election';
import { selectUser } from "../../../userSlice";
import { DateTime } from 'luxon';

export default function ElectionPreview() {

    const [ election, setElection ] = useState(null);

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';

    const electionId = useSelector(selectUser).election_id;
    const { data } = useGetElectionQuery(electionId)
    const dateFormated = data && DateTime.fromISO(data.date_of_election).setLocale('en-gb').toLocaleString();

    //const { data: adminElections } = useGetElectionsQuery()

    
    return (
        <div id='election-preview'>
            {/* {isAdmin ?  
                <select id='election-select' name='election' onChange={(e) => {setElection(e.target.value)}}>
                {adminElections && adminElections.map(election => (
                    <option id={election.id} value={election.name}>{election.name}</option>
                ))}     
                </select> 
                :<h2>Election: {data && data.name}</h2> 
            } */}
            <h2>Election:{data && data.name}</h2>    
            <h2>Date of Election: {dateFormated}</h2>
        </div>
    )
}
import React from "react";
import { useSelector } from "react-redux";
import { useGetElectionQuery } from '../../../services/election';
import { selectUser } from "../../../userSlice";
import { DateTime } from 'luxon';

export default function ElectionPreview() {

    const electionId = useSelector(selectUser).election_id;
    const { data } = useGetElectionQuery(electionId)
    const dateFormated = data && DateTime.fromISO(data.date_of_election).setLocale('en-gb').toLocaleString();
    console.log(dateFormated);
    
    return (
        <div id='election-preview'>
            <h2>Election: {data && data.name}</h2>    
            <h2>Date of Election: {dateFormated}</h2>
        </div>
    )
}
import React from "react";
import { useSelector } from "react-redux";
import { useGetElectionQuery } from '../../../services/election';
import { selectUser } from "../../../userSlice";
import { DateTime } from 'luxon';
import AdminDropDown from "../adminDropDown/adminDropDown";

export default function ElectionPreview({ electionId, setElectionId }) {

    const user = useSelector(selectUser);
    const isAdminOrVoter = user.role === 'admin' || user.role === 'voter';
    const defaultElection = user.role === 'candidate' ? user.election_id : user.election_ids && user.election_ids[0]
    const id = electionId || defaultElection
    const { data } = useGetElectionQuery(id);
    const dateFormated = data && DateTime.fromISO(data.date_of_election).setLocale('en-gb').toLocaleString();

    return (
        <div id='election-preview'>
            {isAdminOrVoter ? <AdminDropDown setElectionId={setElectionId} /> : <h2>{data && data.name}</h2>}    
            <h2>Date of Election: {dateFormated}</h2>
        </div>
    )
}
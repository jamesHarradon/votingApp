import React from "react";
import { useSelector } from "react-redux";
import { useGetElectionQuery } from "../../services/election";
import { selectUser } from "../../userSlice";
import { DateTime } from 'luxon';

export default function CandidateElectionsTableBody() {

    const user = useSelector(selectUser);
    const { data: election } = useGetElectionQuery(user.election_id);

    return (
        <tbody>        
            <tr key={election && election.id}>
                <td>{election && election.name}</td>
                <td>{election && DateTime.fromISO(election.date_of_election).setLocale('en-gb').toLocaleString()}</td>
                <td>{election && election.number_of_candidates}</td>
                <td>{election && election.number_of_voters}</td>
            </tr> 
        </tbody>
    )
}
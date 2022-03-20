import React from "react";
import { useSelector } from "react-redux";
import { useGetElectionQuery } from "../../services/election";
import { selectUser } from "../../userSlice";
import { DateTime } from 'luxon';

export default function VotersElectionsTableBody() {

    const user = useSelector(selectUser);
    const { data } = useGetElectionQuery(user.election_id);

    let elections;
    data?.length === 1 ? elections = [data] : elections = data;

    return (
        <tbody>
            {elections && elections.map(election => (
            <tr key={election.id}>
                <td>{election.name}</td>
                <td>{DateTime.fromISO(election.date_of_election).setLocale('en-gb').toLocaleString()}</td>
                <td>{election.number_of_candidates}</td>
                <td>{election.number_of_voters}</td>
                <td>Edit</td>  
                <td>Delete</td>
            </tr>
            ))}
        </tbody>
    )
}
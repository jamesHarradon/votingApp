import React from "react";
import { useSelector } from "react-redux";
import { useGetAllElectionsQuery } from "../../services/election";
import { selectUser } from "../../userSlice";
import { DateTime } from 'luxon';

export default function VotersElectionsTableBody() {

    const user = useSelector(selectUser);
    const { data: elections } = useGetAllElectionsQuery({ id: user.id, role: user.role });
    
    return (
        <tbody>
            {elections && elections.map(election => (
                <tr key={election.id}>
                    <td>{election.name}</td>
                    <td>{DateTime.fromISO(election.date_of_election).setLocale('en-gb').toLocaleString()}</td>
                    <td>{election.number_of_candidates}</td>
                    <td>{election.number_of_voters}</td>
                </tr>
                ))}
        </tbody>
    )
}
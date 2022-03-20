import React from "react";
import { useSelector } from "react-redux";
import { useGetElectionsQuery } from "../../services/election";
import { selectUser } from "../../userSlice";
import { DateTime } from 'luxon';

export default function AdminElectionsTableBody({ toast, setEditElectionClick, setEditId }) {

    const admin = useSelector(selectUser);

    const { data } = useGetElectionsQuery(admin.id);

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
                <td><button onClick={() => {setEditId(election.id); setEditElectionClick(true);}} className='edit'>Edit</button></td>
                <td><button className='delete'>Delete</button></td>
            </tr>
            ))}
        </tbody>
    )
}
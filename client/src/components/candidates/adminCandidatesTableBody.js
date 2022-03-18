import React from "react";
import { useSelector } from "react-redux";
import { useGetCandidatesQuery } from "../../services/candidate";
import { selectUser } from "../../userSlice";
import { Link } from 'react-router-dom'



export default function AdminCandidatesTableBody() {

    const admin = useSelector(selectUser);

    const { data: candidates } = useGetCandidatesQuery(admin.id);

    return (
        <tbody>
            {candidates && candidates.map(candidate => (
                <tr key={candidate.id}>
                    <td>{candidate.first_name}</td>
                    <td>{candidate.last_name}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.position}</td>
                    <td>{candidate.election_id}</td>
                    <Link to={`/manifesto/${candidate.id}/${candidate.election_id}`}>
                        <td>Manifesto</td>
                    </Link>
                    <td>Edit</td>  
                    <td>Delete</td>
                </tr>
            ))}
        </tbody>
    )
}
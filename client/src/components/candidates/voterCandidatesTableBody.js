import React from "react";
import { useSelector } from "react-redux";
import { useGetCandidatesQuery } from "../../services/candidate";
import { selectUser } from "../../userSlice";
import { Link } from 'react-router-dom'
import EmptyHeader from "../emptyHeader/EmptyHeader";

export default function VoterCandidatesTableBody({ electionFilterId }) {

    const user = useSelector(selectUser);
    const { data } = useGetCandidatesQuery({id: user.id, role: user.role});
    const candidatesFiltered = electionFilterId && data ? data.filter(candidate => candidate.election_id === parseInt(electionFilterId)) : null
    const candidates = candidatesFiltered || data;
    const noCandidates = candidatesFiltered?.length === 0 || !data

    return (
        <tbody>
            {electionFilterId && noCandidates && <td colSpan={5}><EmptyHeader type='candidates' /></td>}
            {candidates && candidates.map(candidate => (
                <tr key={candidate.id}>
                    <td>{candidate.first_name}</td>
                    <td>{candidate.last_name}</td>
                    <td>{candidate.email}</td>
                    <td>{candidate.name}</td>
                    <td><Link className='link' to={`/manifesto/${candidate.id}/${candidate.election_id}`}>Manifesto</Link></td>
                </tr>
            ))}
        </tbody>
    )
}
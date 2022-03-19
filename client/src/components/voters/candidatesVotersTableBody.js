import React from "react";
import { useSelector } from "react-redux";
import { useGetVoterByElectionQuery } from "../../services/voter";
import { selectUser } from "../../userSlice";

export default function CandidatesVotersTableBody() {


    const user = useSelector(selectUser);
    const { data: voters } = useGetVoterByElectionQuery(user.election_id);

    return (
        <tbody>
            {voters && voters.map(voter => (
            <tr key={voter.id}>
                <td>{voter.first_name}</td>
                <td>{voter.last_name}</td>
                <td>{voter.email}</td>
                <td>{voter.election_id}</td>
            </tr>
            ))}
        </tbody>
    )
}
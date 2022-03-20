import React from "react";
import { useSelector } from "react-redux";
import { useGetVotersByElectionQuery } from "../../services/voter";
import { selectUser } from "../../userSlice";

export default function CandidatesVotersTableBody() {


    const user = useSelector(selectUser);
    const { data: voters } = useGetVotersByElectionQuery(user.election_id);

    return (
        <tbody>
            {voters && voters.map(voter => (
            <tr key={voter.id}>
                <td>{voter.first_name}</td>
                <td>{voter.last_name}</td>
                <td>{voter.email}</td>
                <td>{voter.name}</td>
            </tr>
            ))}
        </tbody>
    )
}
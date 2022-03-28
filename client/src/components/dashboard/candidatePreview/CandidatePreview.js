import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../userSlice";
import { useGetCandidatesByElectionQuery } from "../../../services/candidate";


export default function CandidatePreview({ electionId }) {

    const user = useSelector(selectUser);
    const defaultElection = user.role === 'candidate' ? user.election_id : user.election_ids[0]
    const id = electionId || defaultElection
    const { data: candidates } = useGetCandidatesByElectionQuery(id)
    
    //change below to images
    return (
        <div id='candidate-preview'>
            {candidates && candidates.map(candidate => (
                <p key={candidate.id} className='candidate-image'>{`${candidate.first_name} ${candidate.last_name}`}</p>
            ))}
        </div>
    )
}
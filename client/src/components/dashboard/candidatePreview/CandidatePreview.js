import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../userSlice";
import { useGetCandidatesByElectionQuery } from "../../../services/candidate";
import profileImg from '../../../profile.png'

export default function CandidatePreview({ electionId }) {

    const user = useSelector(selectUser);
    const defaultElection = user.role === 'candidate' ? user.election_id : user.election_ids[0]
    const id = electionId || defaultElection
    const { data: candidates } = useGetCandidatesByElectionQuery(id)
    
    //change below to images
    return (
        <div id='candidate-preview'>
            {candidates && candidates.map(candidate => (
                <Link key={candidate.id} to={`/manifesto/${candidate.id}/${candidate.election_id}`} className='candidate-preview-link candidate-image-container'>
                    <img src={profileImg} alt='candidate profile' className='candidate-image'></img>
                    <p className='candidate-name'>{`${candidate.first_name} ${candidate.last_name}`}</p>
                </Link>
            ))}
        </div>
    )
}
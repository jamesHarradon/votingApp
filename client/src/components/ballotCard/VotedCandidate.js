import React from "react";
import { useSelector } from "react-redux";
import { useGetManifestoByCandidateQuery } from "../../services/manifesto";
import { useGetVotedCandidateByVoterQuery } from '../../services/result';
import { selectUser } from '../../userSlice';


export default function VotedCandidate() {

    const user = useSelector(selectUser)
    const { data: candidate } = useGetVotedCandidateByVoterQuery(user.id);
    
    

    return (
        <div className='voted-candidate-container'>
            <div className='ballot-card-candidate'>
                <p> Your Vote has been placed. You voted for: </p>
                <h2>{`${candidate && candidate.first_name} ${candidate && candidate.last_name}`}</h2>
                <p className='ballot-card-candidate-image'>image</p>
                <p>{candidate && candidate.who}</p>  
                <p>{candidate && candidate.what}</p> 
                <p>{candidate && candidate.why}</p> 
            </div>  
        </div>
        
    )
}
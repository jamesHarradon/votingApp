import React from "react";
import { useSelector } from "react-redux";
import { useGetManifestoByCandidateQuery } from "../../services/manifesto";
import { useGetVotedCandidateByVoterQuery } from '../../services/result';
import { selectUser } from '../../userSlice';


export default function VotedCandidate() {

    const user = useSelector(selectUser)
    const { data: candidate, isLoading } = useGetVotedCandidateByVoterQuery(user.id);
    
    

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {candidate && 
            <div className='voted-candidate-container'>
                <div className='ballot-card-candidate'>
                    <p> Your Vote has been placed. You voted for: </p>
                    <h2>{`${candidate.first_name} ${candidate.last_name}`}</h2>
                    <p className='ballot-card-candidate-image'>image</p>
                    <p>{candidate.who}</p>  
                    <p>{candidate.what}</p> 
                    <p>{candidate.why}</p> 
                </div>  
            </div>
            } 
        </>
    )
}
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetManifestoByCandidateQuery } from "../../services/manifesto";
import { useGetVotedCandidateByVoterQuery } from '../../services/result';
import { selectUser } from '../../userSlice';
import AdminDropDown from "../dashboard/adminDropDown/adminDropDown";


export default function VotedCandidate() {

    const [ electionId, setElectionId ] = useState(null);

    const user = useSelector(selectUser);
    const id = electionId || user.election_ids[0];
    const { data: candidate, isLoading } = useGetVotedCandidateByVoterQuery({ id: user.id, electionId: id});
    
    

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {candidate && 
            <>
            <AdminDropDown setElectionId={setElectionId} />
            <div className='voted-candidate-container'>
                <div className='voted-candidate'>
                    <p> Your Vote has been placed. You voted for: </p>
                    <h2>{`${candidate.first_name} ${candidate.last_name}`}</h2>
                    <p className='voted-candidate-image'>image</p>
                    <p>{candidate.who}</p>  
                    <p>{candidate.what}</p> 
                    <p>{candidate.why}</p> 
                </div>  
            </div>
            </>
            } 
        </>
    )
}
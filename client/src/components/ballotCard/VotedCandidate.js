import React from "react";
import { useSelector } from "react-redux";
import { useGetVotedCandidateByVoterQuery } from '../../services/result';
import { selectUser } from '../../userSlice';
import profileImg from '../../profile.png'


export default function VotedCandidate({ electionId }) {

    const user = useSelector(selectUser);
    const id = electionId || user.election_ids[0];
    const { data: candidate, isLoading } = useGetVotedCandidateByVoterQuery({ id: user.id, electionId: id});
    
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {candidate && 
            <>
            <div className='voted-candidate-container'>
                <div className='voted-candidate'>
                    <div className='voted-candidate-flex'>
                        <div>
                            <p> Your Vote has been placed. You voted for: </p>
                            <h2>{`${candidate.first_name} ${candidate.last_name}`}</h2>
                        </div>
                        <div className='voted-candidate-image-container'>
                            <img src={profileImg} alt='candidate profile' className='voted-candidate-image'></img>
                        </div>
                    </div>
                    <div className='manifesto-body voted-candidate-body'>
                        <div className='manifesto-who'>
                            <h2>Who Am I?</h2>
                            <p>{candidate.who}</p>  
                        </div>
                        <div className='manifesto-what'>
                            <h2>What Do I Want To Achieve?</h2>
                            <p>{candidate.what}</p>
                        </div>
                        <div className='manifesto-why'>
                            <h2>Why Vote For Me?</h2>
                            <p>{candidate.why}</p>
                        </div>
                    </div>
                </div>  
            </div>
            </>
            } 
        </>
    )
}
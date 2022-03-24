import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { useGetCandidatesByElectionQuery } from "../../services/candidate";
import { useGetAllManifestosByElectionQuery } from "../../services/manifesto";
import { getUserById, selectUser } from "../../userSlice";
import { usePlaceVoteMutation } from "../../services/voter";
import VotedCandidate from "./VotedCandidate";

export default function BallotCard() {

    const [ radioCandidate, setRadioCandidate ] = useState(null);

    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const hasVoted = user.has_voted;
    
    const { data: candidates, isLoading: candidatesAreLoading } = useGetCandidatesByElectionQuery(user.election_id);
    const { data: manifestos, isLoading: manifestosAreLoading } = useGetAllManifestosByElectionQuery(user.election_id);

    const [ placeVote ] = usePlaceVoteMutation();

    const placeVoteHandler = async (e, voterId, candidateId) => {
        e.preventDefault();
        try {
            const obj = {voterId: voterId, candidateId: candidateId};
            await placeVote(obj);
            setRadioCandidate(null);
            toast('Vote Placed!');
            setTimeout(() => dispatch(getUserById({id: voterId, role: 'voter'})), 3000)
        } catch (error) {
            console.log(error);
        }  
    }

    return (
        
        <div id= 'ballot-card'>
            {hasVoted && <VotedCandidate user={user} />}
            {!hasVoted && 
                <form id='ballot-card-form-grid' onSubmit={(e) => placeVoteHandler(e, user.id, radioCandidate)} onChange={(e) => setRadioCandidate(e.target.value)}>
                <div id='ballot-card-inner-grid'>
                        {candidates && candidates.map(candidate => (   
                            <div className='ballot-card-candidate' to={`/manifesto/${candidate.id}/${candidate.election_id}`} key={candidate.id}>
                                <Link className='ballot-card-link' to={`/manifesto/${candidate.id}/${candidate.election_id}`} key={candidate.id}>
                                    <label htmlFor={candidate.id}>{`${candidate.first_name} ${candidate.last_name}`}</label>
                                </Link>
                                <p className='ballot-card-candidate-image'>image</p>
                                <p>{manifestos && manifestos.map(manifesto => manifesto.candidate_id === candidate.id && manifesto.who)}</p>
                                <input type='radio' id={candidate.id} name={candidate.election_id} value={candidate.id}></input>  
                            </div>    
                        ))}
                </div>
                <button id='ballot-card-submit' type='submit'>Place Vote</button>
                </form>
            }
            <ToastContainer 
                hideProgressBar={true}
                autoClose={3000}
            />
        </div> 
    )
}
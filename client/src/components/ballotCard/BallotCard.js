import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { useGetCandidatesByElectionQuery } from "../../services/candidate";
import { useGetAllManifestosByElectionQuery } from "../../services/manifesto";
import { getUserById, selectUser } from "../../userSlice";
import { useGetHasVotedQuery, usePlaceVoteMutation } from "../../services/voter";
import VotedCandidate from "./VotedCandidate";
import AdminDropDown from '../dashboard/adminDropDown/adminDropDown'
import loadingIcon from '../../loading.png'
import profileImg from '../../profile.png'

export default function BallotCard() {

    const [ radioCandidate, setRadioCandidate ] = useState(null);
    const [ electionId, setElectionId ] = useState(null);

    const user = useSelector(selectUser);
    const id = electionId || user.election_ids[0];
    const hasVoted = false;
    // const { data: hasVoted } = useGetHasVotedQuery({voterId: user.id, electionId: id});

    const { data: candidates, isLoading: candidatesAreLoading } = useGetCandidatesByElectionQuery(id);
    const { data: manifestos, isLoading: manifestosAreLoading } = useGetAllManifestosByElectionQuery(id);

    const [ placeVote ] = usePlaceVoteMutation();

    const placeVoteHandler = async (e, voterId, candidateId) => {
        e.preventDefault();
        try {
            const obj = {voterId: voterId, candidateId: candidateId};
            await placeVote(obj);
            setRadioCandidate(null);
            toast('Vote Placed!');
        } catch (error) {
            console.log(error);
        }  
    }

    return (
        
        <div id= 'ballot-card'>
            {/* {candidatesAreLoading && 
                <img id='loading-icon' src={loadingIcon} alt='loading icon'></img>
            } */}
            <AdminDropDown setElectionId={setElectionId} />
            {hasVoted && <VotedCandidate user={user} />}
            {!hasVoted && 
                <form id='ballot-card-form-grid' onSubmit={(e) => placeVoteHandler(e, user.id, radioCandidate)} onChange={(e) => setRadioCandidate(e.target.value)}>
                <div id='ballot-card-inner-grid'>
                        {candidates && candidates.map(candidate => (   
                            <div className='ballot-card-candidate' key={candidate.id}>
                                <Link className='ballot-card-link' to={`/manifesto/${candidate.id}/${candidate.election_id}`} key={candidate.id}>
                                    <label htmlFor={candidate.id}>{`${candidate.first_name} ${candidate.last_name}`}</label>
                                </Link>
                                <div className='ballot-card-candidate-image-container'>
                                    <img src={profileImg} alt='candidate profile' className='ballot-card-candidate-image'></img>
                                </div>
                                <p className='ballot-card-who'>{manifestos && manifestos.map(manifesto => manifesto.candidate_id === candidate.id && manifesto.who)}</p>
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
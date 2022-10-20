import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useGetCandidatesByElectionQuery } from "../../services/candidate";
import { selectUser } from "../../userSlice";
import { useGetHasVotedQuery, usePlaceVoteMutation } from "../../services/voter";
import VotedCandidate from "./VotedCandidate";
import AdminDropDown from '../dashboard/adminDropDown/adminDropDown'
import profileImg from '../../profile.png'
import VoteConfirmation from "./voteConfirmation";

export default function BallotCard() {

    const [ radioCandidate, setRadioCandidate ] = useState(null);
    const [ electionId, setElectionId ] = useState(null);
    const [ voteClick, setVoteClick ] = useState(false);

    const user = useSelector(selectUser);
    const id = electionId || user.election_ids[0];
    const { data: hasVoted } = useGetHasVotedQuery({voterId: user.id, electionId: id});
    const { data: candidates } = useGetCandidatesByElectionQuery(id);
    
    const [ placeVote ] = usePlaceVoteMutation();

    const cancelHandler = () => {
        setVoteClick(false);
    }

    const proceedHandler = async () => {
        try {
            const obj = {voterId: user.id, candidateId: radioCandidate};
            await placeVote(obj);
            setRadioCandidate(null);
            setVoteClick(false);
            toast('Vote Placed!');
        } catch (error) {
            console.log(error);
        }  
    }

    const placeVoteHandler = (e) => {
        e.preventDefault()
        setVoteClick(true);
    }

    return (
        <>
            {voteClick && <VoteConfirmation cancelHandler={cancelHandler} proceedHandler={proceedHandler}/>}
            <div id= 'ballot-card'>
                <AdminDropDown setElectionId={setElectionId} />
                {hasVoted && <VotedCandidate user={user} electionId={electionId} />}
                {!hasVoted && 
                    <form id='ballot-card-form-grid' onSubmit={(e) => placeVoteHandler(e)} onChange={(e) => setRadioCandidate(e.target.value)}>
                        <div id='ballot-card-inner-grid'>
                                {candidates && candidates.map(candidate => (   
                                    <div className='ballot-card-candidate' key={candidate.id}>
                                        <Link className='ballot-card-link' to={`/manifesto/${candidate.id}/${candidate.election_id}`} key={candidate.id}>
                                            <label htmlFor={candidate.id}>{`${candidate.first_name} ${candidate.last_name}`}</label>
                                        </Link>
                                        <div className='ballot-card-candidate-image-container'>
                                            <img src={profileImg} alt='candidate profile' className='ballot-card-candidate-image'></img>
                                        </div>
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
                    toastStyle={{ backgroundColor: '#ff9b29', color: 'white'}}
                />
            </div> 
        </>
    )
}
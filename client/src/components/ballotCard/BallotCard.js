import React from "react";
import { useSelector } from "react-redux";
import { useGetCandidateByElectionQuery } from "../../services/candidate";
import { useGetAllManifestosByElectionQuery } from "../../services/manifesto";
import { selectUser } from "../../userSlice";

export default function BallotCard() {

    const user = useSelector(selectUser);
    const { data: candidates } = useGetCandidateByElectionQuery(user.election_id)
    const { data: manifestos, error } = useGetAllManifestosByElectionQuery(user.election_id)

    return (
        <div id= 'ballot-card'>
            <form id='ballot-card-form-grid'>
                <div id='ballot-card-inner-grid'>
                {candidates && candidates.map(candidate => (
                   <div key={candidate.id} className='ballot-card-form-candidate'>
                    <label htmlFor={candidate.id}>
                        <div className='ballot-card-candidate'>
                            <p>{`${candidate.first_name} ${candidate.last_name}`}</p>
                            <p className='ballot-card-candidate-image'>image</p>
                            <p>{manifestos && manifestos.map(manifesto => manifesto.candidate_id === candidate.id && manifesto.who)}</p>
                            <input type='radio' id={candidate.id} name={candidate.election} value={candidate.id}></input>  
                        </div>    
                    </label> 
                   </div> 
                ))}
                </div>
                <div id='ballot-card-submit-container'>
                    <input id='ballot-card-submit' type='submit' value='Submit'></input>
                </div>
            </form>
        </div> 
    )
}
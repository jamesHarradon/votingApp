import React from 'react';
import { useSelector } from "react-redux";
import { useGetElectionQuery } from '../../../services/election';
import { useGetVotersByElectionQuery } from '../../../services/voter';
import { selectUser } from "../../../userSlice";


export default function Summaries({ electionId }) {

    const user = useSelector(selectUser);
    const defaultElection = user.role === 'candidate' ? user.election_id : user.election_ids && user.election_ids[0]
    const id = electionId || defaultElection
    const { data: election } = useGetElectionQuery(id);
    const { data: voters } = useGetVotersByElectionQuery(id);
    const voted = voters && voters.filter(voter => voter.has_voted).length;
    const yetToVote = election && election.number_of_voters - voted;
    
    return (
        <div id='summaries'>
            <div className='summary-container'>
                <div className='summary summary-one'>
                    <h1>{voted && voted}</h1>
                </div>
                <div className='summary-name'>
                    <h1>Votes Cast</h1>
                </div>
            </div>


            <div className='summary-container'>
                <div className='summary summary-two'>
                    <h1>{!isNaN(yetToVote) && yetToVote}</h1>
                </div>
                <div className='summary-name'>
                    <h1>Yet to vote</h1>
                </div>
            </div>
        </div>
    )
}
import React from 'react';
import { useSelector } from "react-redux";
import { useGetElectionQuery, useGetElectionVotesQuery } from '../../../services/election';
import { selectUser } from "../../../userSlice";


export default function Summaries({ electionId }) {

    const user = useSelector(selectUser);
    const defaultElection = user.role === 'candidate' ? user.election_id : user.election_ids && user.election_ids[0]
    const id = electionId || defaultElection
    const { data: election } = useGetElectionQuery(id);
    const { data: votes } = useGetElectionVotesQuery(id);
    const yetToVote = election && election.number_of_voters - votes;

    
    return (
        <div id='summaries'>
            <div className='summary-container'>
                <div className='summary summary-one'>
                    <h1>{votes && votes}</h1>
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
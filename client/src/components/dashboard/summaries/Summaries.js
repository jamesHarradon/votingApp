import React from 'react';
import { useSelector } from "react-redux";
import { useGetElectionQuery } from '../../../services/election';
import { useGetVotersByElectionQuery } from '../../../services/voter';
import { selectUser } from "../../../userSlice";

export default function Summaries({ electionId }) {

    const user = useSelector(selectUser);
    const defaultElection = user.role === 'candidate' ? user.election_id : user.election_ids[0]
    const id = electionId || defaultElection
    const { data: election } = useGetElectionQuery(id);
    const { data: voters } = useGetVotersByElectionQuery(id);
    const voted = voters && voters.filter(voter => voter.has_voted).length;
    const yetToVote = election && election.number_of_voters - voted;
    
    return (
        <div id='summaries'>
            <div className='summary'>
                <p>{election && election.number_of_candidates}</p>
                <h4>Candidates</h4>
            </div>
            <div className='summary'>
                <p>{election && election.number_of_voters}</p>
                <h4>Voters</h4>
            </div>
            <div className='summary'>
                <p>{voted && voted}</p>
                <h4>Votes Cast</h4>
            </div>
            <div className='summary'>
                <p>{!isNaN(yetToVote) && yetToVote}</p>
                <h4>Yet to vote</h4>
            </div>
        </div>
    )
}
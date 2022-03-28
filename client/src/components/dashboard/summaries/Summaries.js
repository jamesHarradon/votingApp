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
                <h4>No. of Candidates</h4>
                <p>{election && election.number_of_candidates}</p>
            </div>
            <div className='summary'>
                <h4>No. of Voters</h4>
                <p>{election && election.number_of_voters}</p>
            </div>
            <div className='summary'>
                <h4>Votes Cast</h4>
                <p>{voted && voted}</p>
            </div>
            <div className='summary'>
                <h4>Voters yet to vote</h4>
                <p>{!isNaN(yetToVote) && yetToVote}</p>
            </div>
        </div>
    )
}
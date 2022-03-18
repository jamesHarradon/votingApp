import React from 'react';
import { useSelector } from "react-redux";
import { useGetElectionQuery } from '../../../services/election';
import { selectUser } from "../../../userSlice";

export default function Summaries() {

    const electionId = useSelector(selectUser).election_id;
    console.log(electionId)
    const { data } = useGetElectionQuery(electionId)

    //summaries below will contain dynamic data from state

    return (
        <div id='summaries'>
            <div className='summary'>
                <h4>No. of Candidates</h4>
                <p>{data && data.number_of_candidates}</p>
            </div>
            <div className='summary'>
                <h4>No. of Voters</h4>
                <p>{data && data.number_of_voters}</p>
            </div>
            <div className='summary'>
                <h4>Votes Cast</h4>
                <p>to do</p>
            </div>
            <div className='summary'>
                <h4>Voters yet to vote</h4>
                <p>to do</p>
            </div>
        </div>
    )
}
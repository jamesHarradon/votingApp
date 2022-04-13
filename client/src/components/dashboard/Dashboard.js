import React, { useState } from "react";
import Summaries from "./summaries/Summaries";
import CandidatePreview from "./candidatePreview/CandidatePreview";
import ElectionPreview from "./electionPreview/ElectionPreview";
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";

export default function Dashboard() {

    const [ electionId, setElectionId ] = useState(null);
    const user = useSelector(selectUser);
    const hasElections = user.election_ids.length > 0;

    return (
        <>
        {hasElections &&
            <div id='dashboard'>
            <ElectionPreview electionId={electionId} setElectionId={setElectionId} />
            <Summaries electionId={electionId} />
            <CandidatePreview electionId={electionId} />
            </div>
        }
        {!hasElections &&
            <h2 className='welcome'>Welcome {user.first_name}, please add an election to view Dashboard data. You will then be able to add Candidates and Voters.</h2>
        }
        </>   
    )
}
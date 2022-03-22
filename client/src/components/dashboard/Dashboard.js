import React, { useState } from "react";
import Summaries from "./summaries/Summaries";
import CandidatePreview from "./candidatePreview/CandidatePreview";
import ElectionPreview from "./electionPreview/ElectionPreview";

export default function Dashboard() {

    const [ electionId, setElectionId ] = useState(null);

    return (
        <div id='dashboard'>
            <ElectionPreview electionId={electionId} setElectionId={setElectionId} />
            <Summaries electionId={electionId} />
            <CandidatePreview electionId={electionId} />
        </div>
    )
}
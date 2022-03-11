import React from "react";
import Summaries from "./summaries/Summaries";
import CandidatePreview from "./candidatePreview/CandidatePreview";
import ElectionPreview from "./electionPreview/ElectionPreview";

export default function Dashboard() {
    return (
        <div id='dashboard'>
            <ElectionPreview />
            <Summaries />
            <CandidatePreview />
        </div>
    )
}
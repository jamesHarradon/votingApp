import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";
import ResultsContent from "./ResultsContent";

export default function Results() {
    const user = useSelector(selectUser);
    const isCandidate = user.role === 'candidate'
    const hasElections = user.role !== 'candidate' && user.election_ids.length > 0;

    return (
        <>
            {(hasElections || isCandidate) ? 
            <ResultsContent />
            :
            <>No Results to show</>
            }
        </>
    )
}
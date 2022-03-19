import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetCandidateByIdQuery } from "../../services/candidate";
import { useGetManifestoByCandidateQuery } from "../../services/manifesto";
import { selectUser } from "../../userSlice";

export default function Manifesto() {

    const user = useSelector(selectUser);
    const isVoter = user.role === 'voter';

    const params = useParams();

    const { data: candidate, isLoading: candidateLoading } = useGetCandidateByIdQuery({candidateId: params.candidateId, electionId: params.electionId})
    const { data: manifesto, isLoading: manifestoLoading } = useGetManifestoByCandidateQuery(params.candidateId);

    return (
        <div id= 'manifesto'>
            <div id='manifesto-head'>
                {candidateLoading && <h2>Loading...</h2>}
                <h2>{`${candidate && candidate.first_name} ${candidate && candidate.last_name} `}</h2>
                <h2>{candidate && candidate.position}</h2>
                <h2>{candidate && candidate.name}</h2>
            </div>
            <div id='manifesto-body'>
                {manifestoLoading && <h2>Loading...</h2>}
                <div id='manifesto-who'>
                    <h2>Who Am I?</h2>
                    <p>{manifesto && manifesto.who}</p>
                    {!isVoter&& <button className='edit'>Edit</button>}
                </div>
                <div id='manifesto-what'>
                    <h2>What Do I Want To Achieve?</h2>
                    <p>{manifesto && manifesto.what}</p>
                    {!isVoter && <button className='edit'>Edit</button>}
                </div>
                <div id='manifesto-why'>
                    <h2>Why Vote For Me?</h2>
                    <p>{manifesto && manifesto.why}</p>
                    {!isVoter && <button className='edit'>Edit</button>}
                </div>
            </div>
        </div>
    )
}
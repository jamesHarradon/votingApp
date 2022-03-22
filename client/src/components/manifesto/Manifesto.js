import React, { useState } from "react";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetCandidateByIdQuery } from "../../services/candidate";
import { useGetManifestoByCandidateQuery } from "../../services/manifesto";
import { selectUser } from "../../userSlice";
import EditManifestoForm from "./ManifestoEdit";

export default function Manifesto() {

    const [ editClick, setEditClick ] = useState(false);
    const [ section, setSection ] = useState(null);

    const user = useSelector(selectUser);
    const isVoter = user.role === 'voter';

    const params = useParams();

    const { data: candidate, isLoading: candidateLoading } = useGetCandidateByIdQuery({candidateId: params.candidateId, electionId: params.electionId})
    const { data: manifesto, isLoading: manifestoLoading } = useGetManifestoByCandidateQuery(params.candidateId);

    return (
        <div id= 'manifesto'>
            {editClick && <EditManifestoForm  id={params.candidateId} toast={toast} section={section} setSection={setSection} setEditClick={setEditClick} />}
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
                    {!isVoter && <button onClick={() => { setSection('who'); setEditClick(true);}} className='edit'>Edit</button>}
                </div>
                <div id='manifesto-what'>
                    <h2>What Do I Want To Achieve?</h2>
                    <p>{manifesto && manifesto.what}</p>
                    {!isVoter && <button onClick={() => { setSection('what'); setEditClick(true);}} className='edit'>Edit</button>}
                </div>
                <div id='manifesto-why'>
                    <h2>Why Vote For Me?</h2>
                    <p>{manifesto && manifesto.why}</p>
                    {!isVoter && <button onClick={() => { setSection('why'); setEditClick(true);}} className='edit'>Edit</button>}
                </div>
            </div>
        </div>
    )
}
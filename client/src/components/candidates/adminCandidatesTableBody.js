import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCandidatesQuery, useDeleteCandidateMutation } from "../../services/candidate";
import { selectUser } from "../../userSlice";
import { Link } from 'react-router-dom';
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";
import EmptyHeader from "../emptyHeader/EmptyHeader";



export default function AdminCandidatesTableBody({ toast, setEditCandidateClick, setEditId, electionFilterId }) {

    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteCandidateId, setDeleteCandidateId ] = useState(null);
    const [ deleteCandidateElectionId, setDeleteCandidateElectionId ] = useState(null);

    const admin = useSelector(selectUser);
    const { data } = useGetCandidatesQuery({id: admin.id, role: admin.role});
    const [ deleteCandidate ] = useDeleteCandidateMutation();
    
    const candidatesFiltered = electionFilterId ? data.filter(candidate => candidate.election_id === parseInt(electionFilterId)) : null
    const candidates = candidatesFiltered || data;
    const noCandidates = candidatesFiltered?.length === 0 || !data

    const cancelHandler = () => {
        setDeleteCandidateId(null);
        setDeleteCandidateElectionId(null);
        setDeleteButtonClick(false);
    }

    const proceedHandler = async (candidateId, electionId) => {
        try {
            await deleteCandidate({candidateId: candidateId, electionId: electionId});
            setDeleteButtonClick(false);
            setDeleteCandidateId(null);
            setDeleteCandidateElectionId(null);
            toast('Candidate deleted!')
        } catch (error) {
            setDeleteButtonClick(false);
            toast(error);
        }
    }

    const deleteHandler = (candidateId, electionId) => {
        setDeleteCandidateId(candidateId);
        setDeleteCandidateElectionId(electionId)
        setDeleteButtonClick(true);
    }

    return (
        <>
            {deleteButtonClick && <DeleteConfirmation cancelHandler={cancelHandler} proceedHandler={proceedHandler} name='candidate' deleteId={deleteCandidateId} deleteElectionId={deleteCandidateElectionId}/>}
            <tbody>
                {electionFilterId && noCandidates && <td colSpan={5}><EmptyHeader type='candidates' /></td>}
                {candidates && candidates.map(candidate => (
                    <tr key={candidate.id}>
                        <td>{candidate.first_name}</td>
                        <td>{candidate.last_name}</td>
                        <td className='email-column'>{candidate.email}</td>
                        <td>{candidate.name}</td>
                        {/* <td><Link className='link' to={`/manifesto/${candidate.id}/${candidate.election_id}`}>Manifesto</Link></td>
                        <td><button onClick={() => {setEditId(candidate.id); setEditCandidateClick(true);}} className='edit'>Edit</button></td>
                        <td><button onClick={() => deleteHandler(candidate.id, candidate.election_id)} className='delete'>Delete</button></td> */}
                        <td style={{ display: 'flex', gap: '0.5em', flexWrap: 'wrap'}}>
                            <Link className='link' to={`/manifesto/${candidate.id}/${candidate.election_id}`}>Manifesto</Link>
                            <button onClick={() => {setEditId(candidate.id); setEditCandidateClick(true);}} className='edit'>Edit</button>
                            <button onClick={() => deleteHandler(candidate.id, candidate.election_id)} className='delete'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}
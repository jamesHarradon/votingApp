import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCandidatesQuery, useDeleteCandidateMutation } from "../../services/candidate";
import { selectUser } from "../../userSlice";
import { Link } from 'react-router-dom';
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";



export default function AdminCandidatesTableBody({ toast, setEditCandidateClick, setEditId, electionFilterId }) {

    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);

    const admin = useSelector(selectUser);
    const { data } = useGetCandidatesQuery({id: admin.id, role: admin.role});
    const [ deleteCandidate ] = useDeleteCandidateMutation();
    
    const candidatesFiltered = electionFilterId ? data.filter(candidate => candidate.election_id === parseInt(electionFilterId)) : null
    const candidates = candidatesFiltered || data;

    const cancelHandler = () => {
        setDeleteButtonClick(false);
    }

    const proceedHandler = async (id) => {
        try {
            await deleteCandidate(id);
            setDeleteButtonClick(false);
            toast('Candidate deleted!')
        } catch (error) {
            setDeleteButtonClick(false);
            toast(error);
        }
    }

    const deleteHandler = (id) => {
        setDeleteId(id);
        setDeleteButtonClick(true);
    }

    return (
        <>
            {deleteButtonClick && <DeleteConfirmation cancelHandler={cancelHandler} proceedHandler={proceedHandler} name='candidate' deleteId={deleteId}/>}
            <tbody>
                {candidates && candidates.map(candidate => (
                    <tr key={candidate.id}>
                        <td>{candidate.first_name}</td>
                        <td>{candidate.last_name}</td>
                        <td>{candidate.email}</td>
                        <td>{candidate.position}</td>
                        <td>{candidate.name}</td>
                        <td><Link className='link' to={`/manifesto/${candidate.id}/${candidate.election_id}`}>Manifesto</Link></td>
                        <td><button onClick={() => {setEditId(candidate.id); setEditCandidateClick(true);}} className='edit'>Edit</button></td>
                        <td><button onClick={() => deleteHandler(candidate.id)} className='delete'>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}
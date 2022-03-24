import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteVoterMutation, useGetVotersQuery } from "../../services/voter";
import { selectUser } from "../../userSlice";
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";

export default function AdminVotersTableBody({ toast, setEditVoterClick, setEditId, electionFilterId }) {

    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);
    
    const admin = useSelector(selectUser);
    const { data } = useGetVotersQuery(admin.id);
    const [ deleteVoter ] = useDeleteVoterMutation();

    const votersFiltered = electionFilterId ? data.filter(voter => voter.election_id === parseInt(electionFilterId)) : null
    const voters = votersFiltered || data;

    const cancelHandler = () => {
        setDeleteButtonClick(false);
    }

    const proceedHandler = async (id) => {
        try {
            await deleteVoter(id);
            setDeleteButtonClick(false);
            toast('Voter deleted!')
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
            {deleteButtonClick && <DeleteConfirmation cancelHandler={cancelHandler} proceedHandler={proceedHandler} name='voter' deleteId={deleteId}/>}
            <tbody>
                {voters && voters.map(voter => (
                <tr key={voter.id}>
                    <td>{voter.first_name}</td>
                    <td>{voter.last_name}</td>
                    <td>{voter.email}</td>
                    <td>{voter.name}</td>
                    <td><button onClick={() => {setEditId(voter.id); setEditVoterClick(true);}} className='edit'>Edit</button></td>
                    <td><button onClick={() => deleteHandler(voter.id)} className='delete'>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </>
    )
}
            

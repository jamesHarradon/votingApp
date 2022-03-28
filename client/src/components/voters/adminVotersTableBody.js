import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDeleteVoterMutation, useGetVotersByElectionQuery, useGetVotersQuery } from "../../services/voter";
import { selectUser } from "../../userSlice";
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";

export default function AdminVotersTableBody({ toast, setEditVoterClick, setEditId, electionFilterId, showAll, setShowAll }) {

    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);
    
    const admin = useSelector(selectUser);
    const id = electionFilterId || admin.election_ids[0];
    const { data: allVoters } = useGetVotersQuery(admin.id);
    const { data: votersByElection } = useGetVotersByElectionQuery(id);

    const voters = showAll ? allVoters : votersByElection;

    const firstRender = useRef(true);
    
    useEffect(() => {
        //doesnt run on first render
        if(firstRender.current) {
            firstRender.current = false;
            return;
        }
        setShowAll(false)
    }, [electionFilterId, setShowAll])

    const [ deleteVoter ] = useDeleteVoterMutation();


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
            

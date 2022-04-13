import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDeleteVoterMutation, useGetVotersByElectionQuery, useGetVotersQuery } from "../../services/voter";
import { selectUser } from "../../userSlice";
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";
import { nanoid } from 'nanoid'

export default function AdminVotersTableBody({ toast, setEditVoterClick, setEditId, electionFilterId, showAll, setShowAll }) {

    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteVoterId, setDeleteVoterId ] = useState(null);
    const [ deleteVoterElectionId, setDeleteVoterElectionId ] = useState(null);
    
    const admin = useSelector(selectUser);
    const id = electionFilterId || (admin.election_ids && admin.election_ids[0]);
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
        setDeleteVoterId(null);
        setDeleteVoterElectionId(null);
        setDeleteButtonClick(false);
    }

    const proceedHandler = async (voterId, electionId) => {
        try {
            await deleteVoter({voterId: voterId, electionId: electionId });
            setDeleteButtonClick(false);
            setDeleteVoterId(null);
            setDeleteVoterElectionId(null);
            toast('Voter deleted!')
        } catch (error) {
            setDeleteButtonClick(false);
            toast(error);
        }
    }

    const deleteHandler = (voterId, electionId) => {
        setDeleteVoterId(voterId);
        setDeleteVoterElectionId(electionId);
        setDeleteButtonClick(true);
    }
    
    return (
        <>
            {deleteButtonClick && <DeleteConfirmation cancelHandler={cancelHandler} proceedHandler={proceedHandler} name='voter' deleteId={deleteVoterId} deleteElectionId={deleteVoterElectionId}/>}
            <tbody>
                {voters && voters.map(voter => (
                <tr key={nanoid(10)}>
                    <td>{voter.first_name}</td>
                    <td>{voter.last_name}</td>
                    <td>{voter.email}</td>
                    <td>{voter.name}</td>
                    <td><button onClick={() => {setEditId(voter.id); setEditVoterClick(true);}} className='edit'>Edit</button></td>
                    <td><button onClick={() => deleteHandler(voter.id, voter.election_id)} className='delete'>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </>
    )
}
            

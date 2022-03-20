import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetElectionsQuery, useDeleteElectionMutation } from "../../services/election";
import { selectUser } from "../../userSlice";
import { DateTime } from 'luxon';
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";

export default function AdminElectionsTableBody({ toast, setEditElectionClick, setEditId }) {

    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);

    const admin = useSelector(selectUser);
    const { data } = useGetElectionsQuery(admin.id);

    let elections;
    data?.length === 1 ? elections = [data] : elections = data;

    const [ deleteElection ] = useDeleteElectionMutation()

    const cancelHandler = () => {
        setDeleteButtonClick(false);
    }

    const proceedHandler = async (id) => {
        try {
            await deleteElection(id);
            setDeleteButtonClick(false);
            toast('Election deleted!')
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
                {elections && elections.map(election => (
                <tr key={election.id}>
                    <td>{election.name}</td>
                    <td>{DateTime.fromISO(election.date_of_election).setLocale('en-gb').toLocaleString()}</td>
                    <td>{election.number_of_candidates}</td>
                    <td>{election.number_of_voters}</td>
                    <td><button onClick={() => {setEditId(election.id); setEditElectionClick(true);}} className='edit'>Edit</button></td>
                    <td><button onClick={() => deleteHandler(election.id)} className='delete'>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </>
    )
}
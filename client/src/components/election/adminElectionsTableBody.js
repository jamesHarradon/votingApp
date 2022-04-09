import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllElectionsQuery, useDeleteElectionMutation } from "../../services/election";
import { selectUser, amendElectionIdsAdmin } from "../../userSlice";
import { DateTime } from 'luxon';
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";

export default function AdminElectionsTableBody({ toast, setEditElectionClick, setEditId }) {

    const dispatch = useDispatch();
    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);

    const user = useSelector(selectUser);
    const { data: elections } = useGetAllElectionsQuery({id: user.id, role: user.role});

    const [ deleteElection ] = useDeleteElectionMutation()

    const cancelHandler = () => {
        setDeleteButtonClick(false);
    }

    const proceedHandler = async (id) => {
        try {
            await deleteElection(id);
            dispatch(amendElectionIdsAdmin({action: 'remove', election_id: id}))
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
            {deleteButtonClick && <DeleteConfirmation cancelHandler={cancelHandler} proceedHandler={proceedHandler} name='election' deleteId={deleteId}/>}
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
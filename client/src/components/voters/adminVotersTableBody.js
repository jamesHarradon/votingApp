import React, { useState } from "react";
import { useSelector } from "react-redux";
import { resolvePath } from "react-router-dom";
import { useDeleteVoterMutation, useGetVotersQuery } from "../../services/voter";
import { selectUser } from "../../userSlice";
import DeleteConfirmation from "../deleteConfirmation/DeleteConfirmation";

export default function AdminVotersTableBody({ toast }) {

    const [ deleteButtonClick, setDeleteButtonClick ] = useState(false);
    const [ deleteId, setDeleteId ] = useState(null);
    
    const admin = useSelector(selectUser);
    const { data: voters } = useGetVotersQuery(admin.id);
    const [ deleteVoter, { data }] = useDeleteVoterMutation()

    

    const cancelHandler = () => {
        setDeleteButtonClick(false);
    }

    const proceedHandler = async (id) => {
        try {
            await deleteVoter(id);
            setDeleteButtonClick(false);
            toast('Deleted')
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
                    <td><button className='edit'>Edit</button></td>
                    <td><button onClick={() => deleteHandler(voter.id)} className='delete'>Delete</button></td>
                </tr>
                ))}
            </tbody>
        </>
    )
}
            
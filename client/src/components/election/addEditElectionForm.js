import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { DateTime } from "luxon";
import { useAddElectionMutation, useAmendElectionMutation } from "../../services/election";
import { selectUser, amendElectionIdsAdmin } from "../../userSlice";

export default function AddEditElectionForm(props) {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const [ addElection ] = useAddElectionMutation();
    const [ amendElection ] = useAmendElectionMutation()

    const handleAddElection = async (data) => {
        try {
            const result = await addElection({id: user.id, body: data}).unwrap();
            dispatch(amendElectionIdsAdmin({action: 'add', election_id: result.election_id}));
            props.setClick(false);
            props.toast('Election added!')
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditElection = async (data) => {
        try {
            Object.keys(data).forEach(key => {
                if (data[key] === '' || data[key] == null || data[key] === 0) {
                  delete data[key];
                }
            });
            const obj = {id: props.editId, body: data};
            await amendElection(obj);
            props.setClick(false);
            props.toast('Election edited!')
        } catch (error) {
            console.log(error);
        }
    }

    const formSchema = props.isAdd ? Yup.object().shape({
        name: Yup.string()
        .required('Election Name is required'),
        date_of_election: Yup.string()
        .transform((curr) => DateTime.fromISO(curr).toISODate())
        .required('Date is required'), 
    }) : Yup.object().shape({
        name: Yup.string(),
        date_of_election: Yup.string()
        .nullable()
        .transform((curr) => DateTime.fromISO(curr).toISODate()),
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => props.setClick(false)}>+</div>
                <h2>{props.isAdd ? 'Add Election' : 'Edit Election'}</h2><br></br>
            {!props.isAdd && <p>Only fill in fields you want to edit</p>}
                <form className='add-form' onSubmit={handleSubmit(props.isAdd ? handleAddElection : handleEditElection)}>
                    <div className="add-form-fields">
                        
                        <input type='text' id='name' name='name' placeholder="Election Name" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.name?.message}</div>

                        <input type='date' id='date_of_election' name='date_of_election' {...register('date_of_election')} className={`form-control ${errors.date_of_election ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.date_of_election?.message}</div>
                        
                    </div>
                    <button type='submit' className='submit-btn'>Submit</button>  
                </form>
            </div>
        </div>
    )
}
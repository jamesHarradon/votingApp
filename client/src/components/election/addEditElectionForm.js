import React from "react";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { DateTime } from "luxon";
import { useAddElectionMutation, useAmendElectionMutation } from "../../services/election";
import { selectUser } from "../../userSlice";

export default function AddEditElectionForm(props) {

    const user = useSelector(selectUser);
    const [ addElection ] = useAddElectionMutation();
    const [ amendElection ] = useAmendElectionMutation()

    const handleAddElection = async (data) => {
        try {
            await addElection({id: user.id, body: data});
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
            const obj = {id: props.editId, data: data};
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
        number_of_candidates: Yup.number()
        .min(1, 'Must be greater than 0')
        .required('Number of Candidates is required'),
        number_of_voters: Yup.number()
        .min(1, 'Must be greater than 0')
        .required('Number of Voters is required')
    }) : Yup.object().shape({
        name: Yup.string(),
        date_of_election: Yup.string()
        .nullable()
        .transform((curr) => DateTime.fromISO(curr).toISODate()),
        number_of_candidates: Yup.number()
        .nullable()
        .transform((_, val) => val === Number(val) ? val : null),
        number_of_voters: Yup.number()
        .nullable()
        .transform((_, val) => val === Number(val) ? val : null) 
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
                        
                        <input type='number' defaultValue={props.isAdd ? 0 : null} id='number_of_candidates' name='number_of_candidates' {...register('number_of_candidates')} className={`form-control ${errors.number_of_candidates ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.number_of_candidates?.message}</div>

                        <input type='number' defaultValue={props.isAdd ? 0 : null}   id='number_of_voters' name='number_of_voters' {...register('number_of_voters')} className={`form-control ${errors.number_of_voters ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.number_of_voters?.message}</div>
                    
                    </div>
                    <button type='submit' className='submit-btn'>Submit</button>  
                </form>
            </div>
        </div>
    )
}
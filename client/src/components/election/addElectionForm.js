import React from "react";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { DateTime } from "luxon";
import { useAddElectionMutation } from "../../services/election";
import { selectUser } from "../../userSlice";

export default function AddElectionForm({ setAddElectionClick }) {

    const user = useSelector(selectUser);
    const [addElection, { data }] = useAddElectionMutation();

    const handleAddCandidate = async(data) => {
        try {
            await addElection({id: user.id, body: data});
            setAddElectionClick(false);
            toast('Election added!')
        } catch (error) {
            console.log(error)
        }
    }

    const formSchema = Yup.object().shape({
        name: Yup.string()
        .required('Election Name is required'),
        date_of_election: Yup.string()
        .transform((curr) => DateTime.fromISO(curr).toISODate())
        .required('Date is required'), 
        number_of_candidates: Yup.number()
        .required('Number of Candidates is required'),
        number_of_voters: Yup.number()
        .required('Number of Voters is required')
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => setAddElectionClick(false)}>+</div>
                <h2>Add Election</h2>
                <form className='add-form' onSubmit={handleSubmit(handleAddCandidate)}>
                    <div className="add-form-fields">
                        
                        <input type='text' id='name' name='name' placeholder="Election Name" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.name?.message}</div>

                        <input type='date' id='date_of_election' name='date_of_election' {...register('date_of_election')} className={`form-control ${errors.date_of_election ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.date_of_election?.message}</div>
                        
                        <input type='number' min={1} id='number_of_candidates' name='number_of_candidates' {...register('number_of_candidates')} className={`form-control ${errors.number_of_candidates ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.number_of_candidates?.message}</div>

                        <input type='number' min={1} id='number_of_voters' name='number_of_voters' {...register('number_of_voters')} className={`form-control ${errors.number_of_voters ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.number_of_voters?.message}</div>
                    
                    </div>
                    <button type='submit' className='submit-btn'>Submit</button>  
                </form>
            </div>
        </div>
    )
}
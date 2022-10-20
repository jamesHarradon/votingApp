import React from "react";
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { selectUser } from "../../userSlice";
import { useGetAllElectionsQuery } from "../../services/election";
import { useAddVoterMutation, useAmendVoterMutation } from "../../services/voter";

export default function AddEditVoterForm(props) {

    const admin = useSelector(selectUser);

    const { data: elections } = useGetAllElectionsQuery({ id: admin.id, role: admin.role });
    const [ addVoter ] = useAddVoterMutation();
    const [ amendVoter ] = useAmendVoterMutation()

    const handleAddVoter = async (data) => {
        try {
            await addVoter(data);
            props.setClick(false);
            props.toast('Voter added!')
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditVoter = async (data) => {
        try {
            Object.keys(data).forEach(key => {
                if (data[key] === '' || data[key] == null || data[key] === 0) {
                  delete data[key];
                }
            });
            const obj = {id: props.editId, body: data};
            await amendVoter(obj);
            props.setClick(false);
            props.toast('Voter edited!')
        } catch (error) {
            console.log(error);
        }
    }

    const formSchema = props.isAdd ? Yup.object().shape({
        first_name: Yup.string()
        .required('First Name is required'),
        last_name: Yup.string()
        .required('Last Name is required'), 
        email: Yup.string()
        .required('Email is required')
        .email(),
        election_id: Yup.number()
        .min(1, 'Election is required')
    }) : Yup.object().shape({
        first_name: Yup.string(),
        last_name: Yup.string(),
        email: Yup.string()
        .email(),
        election_id: Yup.number()
    }) 

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, setValue, handleSubmit, formState:{ errors } } = useForm(formOptions);
    return (
        <div  className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => props.setClick(false)}>+</div>
            <h2>{props.isAdd ? 'Add Voter' : 'Edit Voter'}</h2><br></br>
            {!props.isAdd && <p>Only fill in fields you want to edit</p>}
            <form onSubmit={handleSubmit(props.isAdd ? handleAddVoter : handleEditVoter)}>
                <div className='add-form-fields'>
                
                    <input type='text' id='first_name' name='first_name' placeholder="First Name" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                    <div className='invalid-feedback'>{errors.first_name?.message}</div>

                    <input type='text' id='last_name' name='last_name' placeholder="Last Name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} ></input>
                    <div className='invalid-feedback'>{errors.last_name?.message}</div>
                    
                    <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                    <div className='invalid-feedback'>{errors.email?.message}</div>
                    
                    <select id='election_id' name='election_id' defaultValue={0} onChange={(e) => setValue('election_id', e.target.value, { shouldValidate: true })} {...register('election_id')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}>
                        <option  value={0} disabled hidden>Select Election</option>
                        {elections && elections.map(election => (
                            <option key={election.id} value={election.id}>{election.name}</option>
                        ))}  
                    </select>
                    <div className='invalid-feedback'>{errors.election_id?.message}</div>
                </div>           
                <button type='submit' className='submit'>Submit</button>  
            </form>
            </div>
        </div>
    )
}
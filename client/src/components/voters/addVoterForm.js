import React from "react";
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { selectUser } from "../../userSlice";
import { useGetElectionsQuery } from "../../services/election";
import { useAddVoterMutation } from "../../services/voter";

export default function AddVoterForm() {

    const admin = useSelector(selectUser);

    const { data: elections } = useGetElectionsQuery(admin.id);
    const [addVoter, { data }] = useAddVoterMutation()

    const handleAddVoter = async (data) => {
        console.log(data);
        //return addVoter(data);
    }

    const formSchema = Yup.object().shape({
        first_name: Yup.string()
        .required('First Name is required'),
        last_name: Yup.string()
        .required('Last Name is required'), 
        email: Yup.string()
        .required('Email is required')
        .email(),
        //.matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format'),
        election_id: Yup.number()
        .required('Election is required')

    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, setValue, handleSubmit, formState:{ errors } } = useForm(formOptions);
    return (
        <form onSubmit={handleSubmit(handleAddVoter)}>
            <div className='add-form-fields'>
            
                <input type='text' id='first_name' name='first_name' placeholder="First Name" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                <div className='invalid-feedback'>{errors.first_name?.message}</div>

                <input type='text' id='last_name' name='last_name' placeholder="Last Name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.last_name?.message}</div>
                
                <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                <div className='invalid-feedback'>{errors.email?.message}</div>
                
                <select id='election_id' name='election_id' placeholder="Election" onChange={(e) => setValue('election_id', e.target.value, { shouldValidate: true })} {...register('election_id')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}>
                    {elections && elections.map(election => (
                        <option key={election.id} value={election.id}>{election.name}</option>
                    ))}  
                </select>
                <div className='invalid-feedback'>{errors.election_id?.message}</div>
            </div>           
            <button type='submit' className='submit-btn'>Submit</button>  
        </form>
    )
}
import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAddVoterMutation, useGetVoterByElectionQuery, useGetCandidatesQuery, useGetCandidateByElectionQuery } from '../../services/candidate';
import { useGetElectionsQuery } from '../../services/election';
import { selectUser } from '../../userSlice'

// notes - data for each candidate will be a link to their manifesto



export default function Candidates() {

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';

    const { data: adminCandidates } = useGetCandidatesQuery(user.id);
    const { data: voterCandidates } = useGetCandidateByElectionQuery(user.election_id)
    const { data: elections } = useGetElectionsQuery(user.id);
    
    const candidates = isAdmin ? adminCandidates : voterCandidates;

    //const [addVoter, { data }] = useAddCandidateMutation()
    
    const handleregister = (data) => {
        console.log(data);
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
        position: Yup.string()
        .required('Position is required'),
        election_id: Yup.number()
        .required('Election is required')
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, setValue, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div id='candidates'>
            {isAdmin && (
                <form className='add-form' onSubmit={handleSubmit(handleregister)}>
                    <div className='add-form-fields'>
                        
                        <input type='text' id='first_name' name='first_name' placeholder="First Name" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.first_name?.message}</div>

                        <input type='text' id='last_name' name='last_name' placeholder="Last Name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.last_name?.message}</div>
                        
                        <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.email?.message}</div>
                        
                        <select id='position' name='position' placeholder="Position" onChange={(e) => setValue('position', e.target.value, { shouldValidate: true })} {...register('position')} className={`form-control ${errors.position ? 'is-invalid' : ''}`}>
                            <option value='President'>President</option>
                            <option value='Vice President'>Vice President</option>
                            <option value='General Secretary'>General Secretary</option>  
                        </select>
                        <div className='invalid-feedback'>{errors.position?.message}</div>

                        <select id='election_id' name='election_id' placeholder="Election" onChange={(e) => setValue('election_id', e.target.value, { shouldValidate: true })} {...register('election_id')} className={`form-control ${errors.election_id ? 'is-invalid' : ''}`}>
                            {elections && elections.map(election => (
                                <option key={election.id} value={election.id}>{election.name}</option>
                            ))}  
                        </select>
                        <div className='invalid-feedback'>{errors.election_id?.message}</div>
        
                    </div>
                    <button type='submit' className='submit-btn'>Submit</button>  
                </form>
            )}
            <div className='table-fixed-head'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Election</th>
                        </tr>
                    </thead>
                    <tbody>
                    {candidates && candidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.first_name}</td>
                            <td>{candidate.last_name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.position}</td>
                            <td>{candidate.election_id}</td>
                            <Link to={`/manifesto/${candidate.id}/${candidate.election_id}`}>
                                <td>Manifesto</td>
                            </Link>
                            {isAdmin && <td>Edit</td>}  
                            {isAdmin && <td>Delete</td>}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
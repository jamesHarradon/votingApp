import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// notes - data for each candidate will be a link to their manifesto



export default function Candidates() {

    const formSchema = Yup.object().shape({
        first_name: Yup.string()
       .required('First Name is required'),
        last_name: Yup.string()
        .required('Last Name is required'), 
        email: Yup.string()
        .required('Email is required')
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i, 'Email must be in correct format'),
        position: Yup.string()
       .required('Position is required'),
        name: Yup.string()
        .required('Election is required')
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { addCandidate, handleSubmit, formState:{ errors } } = useForm(formOptions);

    const isAdmin = true;

    const candidates = [{first_name: 'James', last_name: 'Harradon', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Millie', last_name: 'Cornish', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', position: 'President', election: 'Position of Union Vice President at Twitter'} ]

    return (
        <div id='candidates'>
            {isAdmin && (
                <form>
                    <form className='add-candidate-form' onSubmit={handleSubmit(handleAddCandidate)}>
                    <div className="add-candidate-form-fields">
                        
                        <input type='text' id='first_name' name='first_name' placeholder="First Name" {...addCandidate('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.first_name?.message}</div>

                        <input type='text' id='last_name' name='last_name' placeholder="Last Name" {...addCandidate('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.last_name?.message}</div>
                        
                        <input type='email' id='email' name='email' placeholder="Email" {...addCandidate('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.email?.message}</div>
                        
                        <select id='position' name='position' placeholder="Position" {...addCandidate('position')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}>
                            <option value='President'>President</option>
                            <option value='Vice President'>Vice President</option>
                            <option value='General Secretary'>General Secretary</option>
                            <option value=''></option>    
                        </select>
                        <div className='invalid-feedback'>{errors.position?.message}</div>

                        <select id='election' name='position' placeholder="Position" {...addCandidate('position')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}>
                            {elections.map(election => (
                                <option value={election.id}>{election.name}</option>
                            ))}  
                        </select>
                        <div className='invalid-feedback'>{errors.position?.message}</div>
        
                    </div>
                <button type='submit' className='submit-btn'>Submit</button>  

                </form>
            )}
            <table>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Election</th>
                </tr>
                {candidates.map(candidate => (
                <tr>
                    <td>{`${candidate.first_name} ${candidate.last_name}`}</td>
                    <td>{candidate.position}</td>
                    <td>{candidate.election}</td>
                    {isAdmin && <td>Edit</td>}  
                    {isAdmin && <td>Delete</td>}
                </tr>
                ))}
            </table>
        </div>
    )
}
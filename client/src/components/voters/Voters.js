import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// notes - data for each voters will be a link to their manifesto



export default function Voters() {

    // will be replaced by state data
    const elections = [
        {name: 'Position of Union President at Twitter', date: '10-09-2-22', number_of_candidates: 4, number_of_voters: 50},
        {name: 'Position of Union Vice President at Twitter', date: '10-09-2-22', number_of_candidates: 2, number_of_voters: 50},
        {name: 'Position of Committee President at Twitter', date: '10-09-2-22', number_of_candidates: 3, number_of_voters: 50}
    ]
    // will be replaced by state data
    const isAdmin = true;

    // will be replaced by state data
    const voters = [{id: 1, first_name: 'Bob', last_name: 'Smith', email: 'b.smith@gmail.com', election: 'Position of Union Vice President at Twitter'}, {id: 2, first_name: 'Gina', last_name: 'Patch', email: 'g.patch@gmail.com', election: 'Position of Union President at Twitter'}, {id: 3, first_name: 'Mike', last_name: 'Tyson', email: 'm.tyson@gmail.com', election: 'Position of Union Vice President at Facebook'} ]

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
        name: Yup.array()
        .required('Election is required')
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);


    return (
        <div id='candidates'>
            {isAdmin && (
                
                <form className='add-form' onSubmit={handleSubmit(handleregister)}>
                    <div className="add-form-fields">
                        
                        <input type='text' id='first_name' name='first_name' placeholder="First Name" {...register('first_name')} className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.first_name?.message}</div>

                        <input type='text' id='last_name' name='last_name' placeholder="Last Name" {...register('last_name')} className={`form-control ${errors.last_name ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.last_name?.message}</div>
                        
                        <input type='email' id='email' name='email' placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.email?.message}</div>
                        
                        <select id='election' name='election' placeholder="Election" {...register('election')} className={`form-control ${errors.election ? 'is-invalid' : ''}`}>
                            {elections.map(election => (
                                <option value={election.id}>{election.name}</option>
                            ))}  
                        </select>
                        <div className='invalid-feedback'>{errors.election?.message}</div>
        
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
                            <th>Election</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voters.map(voters => (
                        <tr>
                            <td>{voters.first_name}</td>
                            <td>{voters.last_name}</td>
                            <td>{voters.email}</td>
                            <td>{voters.election}</td>
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
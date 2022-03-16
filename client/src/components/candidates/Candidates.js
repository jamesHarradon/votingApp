import React from "react";
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// notes - data for each candidate will be a link to their manifesto



export default function Candidates() {

    // will be replaced by state data
    const elections = [
        {name: 'Position of Union President at Twitter', date: '10-09-2-22', number_of_candidates: 4, number_of_voters: 50},
        {name: 'Position of Union Vice President at Twitter', date: '10-09-2-22', number_of_candidates: 2, number_of_voters: 50},
        {name: 'Position of Committee President at Twitter', date: '10-09-2-22', number_of_candidates: 3, number_of_voters: 50}
    ]
    // will be replaced by state data
    const isAdmin = true;

    // will be replaced by state data
    const candidates = [{first_name: 'James', last_name: 'Harradon', email: 'james.harradon@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Millie', last_name: 'Cornish', email: 'millie.cornish@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'}, {first_name: 'Sam', last_name: 'Gibbons', email: 'sam.gibbons@gmail.com', position: 'President', election: 'Position of Union Vice President at Twitter'} ]

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
        position: Yup.array()
        .required('Position is required'),
        name: Yup.array()
        .required('Election is required')
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);


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
                        
                        <select id='position' name='position' placeholder="Position" {...register('position')} className={`form-control ${errors.position ? 'is-invalid' : ''}`}>
                            <option value='President'>President</option>
                            <option value='Vice President'>Vice President</option>
                            <option value='General Secretary'>General Secretary</option>  
                        </select>
                        <div className='invalid-feedback'>{errors.position?.message}</div>

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
                            <th>Position</th>
                            <th>Election</th>
                        </tr>
                    </thead>
                    <tbody>
                    {candidates.map(candidate => (
                        <tr>
                            <td>{candidate.first_name}</td>
                            <td>{candidate.last_name}</td>
                            <td>{candidate.email}</td>
                            <td>{candidate.position}</td>
                            <td>{candidate.election}</td>
                            <Link to={`/manifesto/${candidate.id}`}>
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
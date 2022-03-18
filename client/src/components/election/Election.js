import React from "react";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { DateTime } from 'luxon';
import { useGetElectionQuery, useGetElectionsQuery } from '../../services/election';

import { selectUser } from '../../userSlice'


export default function Election() {

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';

    const { data: adminElections } = useGetElectionsQuery(user.id);
    const { data: voterElections } = useGetElectionQuery(user.election_id);

    const elections = isAdmin ? adminElections : [voterElections];

    const handleAddCandidate = (data) => {
        console.log(data);
    }

    const formSchema = Yup.object().shape({
        name: Yup.string()
        .required('Election Name is required'),
        date: Yup.date()
        .required('Date is required'), 
        candidates: Yup.number()
        .required('Number of Candidates is required'),
        voters: Yup.number()
        .required('Number of Voters is required')
    })

    const formOptions = {resolver: yupResolver(formSchema)};
    const { register, handleSubmit, formState:{ errors } } = useForm(formOptions);

    return (
        <div id='election'>
            {isAdmin && ( 
                <form className='add-form' onSubmit={handleSubmit(handleAddCandidate)}>
                    <div className="add-form-fields">
                        
                        <input type='text' id='name' name='name' placeholder="Election Name" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`}></input>
                        <div className='invalid-feedback'>{errors.name?.message}</div>

                        <input type='date' id='date' name='date' placeholder="Date" {...register('date')} className={`form-control ${errors.date ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.date?.message}</div>
                        
                        <input type='number' min={1} id='candidates' name='candidates' placeholder="Candidates" {...register('candidates')} className={`form-control ${errors.candidates ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.candidates?.message}</div>

                        <input type='number' min={1} id='voters' name='voters' placeholder="Voters" {...register('voters')} className={`form-control ${errors.voters ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.voters?.message}</div>
                    
                    </div>
                    <button type='submit' className='submit-btn'>Submit</button>  
                </form>
            )}
            <div className='table-fixed-head'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Election</th>
                            <th>Date</th>
                            <th>Candidates</th>
                            <th>Voters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {elections && elections.map(election => (
                        <tr key={election.id}>
                            <td>{election.name}</td>
                            <td>{DateTime.fromISO(election.date_of_election).setLocale('en-gb').toLocaleString()}</td>
                            <td>{election.number_of_candidates}</td>
                            <td>{election.number_of_voters}</td>
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
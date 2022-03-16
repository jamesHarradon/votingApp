import React from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


export default function Election() {

    // will be replaced by state data
    const isAdmin = true;

    // will be replaced by state data
    const elections = [
        {name: 'Position of Union President at Twitter', date: '10-09-2-22', number_of_candidates: 4, number_of_voters: 50},
        {name: 'Position of Union Vice President at Twitter', date: '10-09-2-22', number_of_candidates: 2, number_of_voters: 50},
        {name: 'Position of Committee President at Twitter', date: '10-09-2-22', number_of_candidates: 3, number_of_voters: 50}
    ]

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
                        
                        <input type='number' id='candidates' name='candidates' placeholder="Candidates" {...register('candidates')} className={`form-control ${errors.candidates ? 'is-invalid' : ''}`} ></input>
                        <div className='invalid-feedback'>{errors.candidates?.message}</div>

                        <input type='number' id='voters' name='voters' placeholder="Voters" {...register('voters')} className={`form-control ${errors.voters ? 'is-invalid' : ''}`} ></input>
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
                        {elections.map(election => (
                        <tr>
                            <td>{election.name}</td>
                            <td>{election.date}</td>
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
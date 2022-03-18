import React from "react";
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAddVoterMutation, useGetVoterByElectionQuery, useGetVotersQuery } from '../../services/voter';
import { useGetElectionsQuery } from '../../services/election';
import { selectUser } from '../../userSlice'
import { matchRoutes } from "react-router-dom";

// notes - data for each voters will be a link to their manifesto



export default function Voters() {

    const user = useSelector(selectUser);
    const isAdmin = user.role === 'admin';

    // need to get either admin voters or candidate voters here but cant call hooks conditionally!
    const { data: voters } = useGetVotersQuery(user.id);
    //const { data: voters } = useGetVoterByElectionQuery(user.election_id);
    const { data: elections } = useGetElectionsQuery(user.id);
    //const { data: elections } = useGetElection(user.election_id);

    //const [addVoter, { data }] = useAddVoterMutation()

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
        <div id='voters'>
            {isAdmin && (
                
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
                        {voters && voters.map(voter => (
                        <tr key={voter.id}>
                            <td>{voter.first_name}</td>
                            <td>{voter.last_name}</td>
                            <td>{voter.email}</td>
                            <td>{voter.election_id}</td>
                            {isAdmin && <td><button>Edit</button></td>}  
                            {isAdmin && <td><button>Delete</button></td>}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
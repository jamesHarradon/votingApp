import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../userSlice";
import AdminDropDown from "../dashboard/adminDropDown/adminDropDown";
import { useGetResultsByElectionQuery } from "../../services/result";
import { DateTime } from 'luxon';

export default function Results() {

    const [ electionId, setElectionId ] = useState(null);

    const user = useSelector(selectUser);
    const isAdminOrVoter = user.role === 'admin' || user.role === 'voter';
    const id = electionId || user.election_ids[0];
    const { data, isLoading } = useGetResultsByElectionQuery(id);
    const dateFormated = data && DateTime.fromISO(data.election.date_of_election).setLocale('en-gb').toLocaleString();
    

    return (
        <div id='results'>
        {isLoading && <p>Loading...</p>}
        {isAdminOrVoter && <AdminDropDown setElectionId={setElectionId} />}
        {data && 
        <>
            <div id='results-head'>
                <h1>Congratulations: {`${data.winner.first_name} ${data.winner.last_name}`}</h1>
                <div id='results-head'>
                    <h2><span className='bold'>Winner of Election:</span> {data.winner.name}</h2>
                    <h2><span className='bold'>Date:</span> {dateFormated}</h2>
                </div>
            </div>
            <div id='results-body' className='results-flex'>
                <p><span className='bold'>Number of Votes:</span> {data.winner.votes}</p>
                <p><span className='bold'>Number of Candidates:</span> {data.election.number_of_candidates}</p>
                <p><span className='bold'>Number of Voters:</span> {data.election.number_of_voters}</p>
            </div>
            <div id='results-table'>
                <div className='table-fixed-head'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Position</th>
                                <th>Election</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.results.map(candidate => (
                            <tr key={candidate.candidate_id}>
                                <td>{candidate.first_name}</td>
                                <td>{candidate.last_name}</td>
                                <td>{candidate.position}</td>
                                <td>{candidate.name}</td>
                                <td>{candidate.votes}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        }   
        </div>
    )
}
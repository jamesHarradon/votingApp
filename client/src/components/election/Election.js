import React from "react";

export default function Election() {

    const isAdmin = true;

    const elections = [
        {name: 'Position of Union President at Twitter', date: '10-09-2-22', number_of_candidates: 4, number_of_voters: 50},
        {name: 'Position of Union Vice President at Twitter', date: '10-09-2-22', number_of_candidates: 2, number_of_voters: 50},
        {name: 'Position of Committee President at Twitter', date: '10-09-2-22', number_of_candidates: 3, number_of_voters: 50}
    ]
    return (
        <div id='election'>
            <table>
                <tr>
                    <th>Election</th>
                    <th>Date</th>
                    <th>Candidates</th>
                    <th>Voters</th>
                </tr>
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
            </table>
        </div>
    )
}
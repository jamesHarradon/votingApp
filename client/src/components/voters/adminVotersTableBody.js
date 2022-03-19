import React from "react";
import { useSelector } from "react-redux";
import { useGetVotersQuery } from "../../services/voter";
import { selectUser } from "../../userSlice";

export default function AdminVotersTableBody() {

    const admin = useSelector(selectUser);
    const { data: voters } = useGetVotersQuery(admin.id);
    
    return (
        <tbody>
            {voters && voters.map(voter => (
            <tr key={voter.id}>
                <td>{voter.first_name}</td>
                <td>{voter.last_name}</td>
                <td>{voter.email}</td>
                <td>{voter.election_id}</td>
                <td><button className='edit'>Edit</button></td>
                <td><button className='delete'>Delete</button></td>
            </tr>
            ))}
        </tbody>
    )
}
            

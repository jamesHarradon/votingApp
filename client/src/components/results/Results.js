import React from "react";

export default function Results() {

    // will be replaced by state data
    const winner = {id: 1, first_name: 'Darren', last_name: 'Bayer', position: 'President', name: 'Position of President at Facebook', votes: 10};

    // will be replaced by state data
    const results = [{id: 1, first_name: 'Darren', last_name: 'Bayer', position: 'President', name: 'Position of President at Facebook'}, {id: 2, first_name: 'Gary', last_name: 'Johnson', position: 'President', name: 'Position of President at Facebook', votes: 8}, {id: 3, first_name: 'Derrick', last_name: 'Black', position: 'President', name: 'Position of President at Facebook', votes: 2}]

    // will be replaced by state data
    const elections = [
        {name: 'Position of Union President at Twitter', date: '10-09-2-22', number_of_candidates: 4, number_of_voters: 50},
        {name: 'Position of Union Vice President at Twitter', date: '10-09-2-22', number_of_candidates: 2, number_of_voters: 50},
        {name: 'Position of Committee President at Twitter', date: '10-09-2-22', number_of_candidates: 3, number_of_voters: 50}
    ]

    const onChangeHandler = (e) => {
        e.preventDefault();
        //dispatch(getResults(e.target.id)) -  this may look different as will use RTK Query
    }

    return (
        <div id='results'>
            <select id='position' name='position' placeholder="Position" onChange={onChangeHandler}>
                <option defaultValue='Select Election'>Select Election</option>
                {elections.map(election => (
                    <option id={election.id} value={election.name}>{election.name}</option>
                ))}     
            </select>
        </div>
    )
}
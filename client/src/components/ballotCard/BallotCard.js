import React from "react";

export default function BallotCard() {

    const candidates = [{id: 1, first_name: 'James', last_name: 'Harradon', position: 'President', election: 'Position of Union Vice President at Twitter', who: 'this is a test paragraph on who I am' }, {id: 2, first_name: 'Millie', last_name: 'Cornish', position: 'President', election: 'Position of Union Vice President at Twitter', who: 'this is a test paragraph on who I am'}, {id: 3, first_name: 'Sam', last_name: 'Gibbons', position: 'President', election: 'Position of Union Vice President at Twitter', who: 'this is a test paragraph on who I am'}]

    

    return (
        <div id= 'ballot-card'>
            <form id='ballot-card-form-grid'>
                <div id='ballot-card-inner-grid'>
                {candidates.map(candidate => (
                   <div className='ballot-card-form-candidate'>
                    <label for={candidate.id}>
                        <div className='ballot-card-candidate'>
                            <p>{`${candidate.first_name} ${candidate.last_name}`}</p>
                            <p className='ballot-card-candidate-image'>image</p>
                            <p>{candidate.who}</p>
                            <input type='radio' id={candidate.id} name={candidate.election} value={candidate.id}></input>  
                        </div>    
                    </label> 
                   </div> 
                ))}
                </div>
                <div id='ballot-card-submit-container'>
                    <input id='ballot-card-submit' type='submit' value='Submit'></input>
                </div>
            </form>
        </div>
    )
}
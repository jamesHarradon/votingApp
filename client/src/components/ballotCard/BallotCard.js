import React from "react";

export default function BallotCard() {

    const candidates = [{id: 1, first_name: 'James', last_name: 'Harradon', position: 'President', election: 'Position of Union Vice President at Twitter', who: 'this is a test paragraph on who I am' }, {id: 2, first_name: 'Millie', last_name: 'Cornish', position: 'President', election: 'Position of Union Vice President at Twitter', who: 'this is a test paragraph on who I am'}, {id: 3, first_name: 'Sam', last_name: 'Gibbons', position: 'President', election: 'Position of Union Vice President at Twitter', who: 'this is a test paragraph on who I am'}]

    

    return (
        <div id= 'ballot-card'>
            <form>
                {candidates.map(candidate => (
                   <>
                    <label for={candidate.id}>
                        <div class='ballot-candidate'>
                            <p>{`${candidate.first_name} ${candidate.last_name}`}</p>
                            <p class='candidate-image'>image</p>
                            <p>{candidate.who}</p>
                        </div>       
                    </label>
                    <input type='radio' id={candidate.id} name={candidate.election} value={candidate.id}></input>
                   </> 
                ))}
                <input type='submit' value='Submit'></input>
            </form>
        </div>
    )
}
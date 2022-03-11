import React from "react";

export default function Manifesto() {

    const isAdmin = true; //this is to simulate if user is admin
    const isCandidate = true;

    const candidate = {first_name: 'James', last_name: 'Harradon', position: 'President', name: 'Position of Union President at Twitter', who: 'This is a test paragraph on who I am', what: 'This is a test paragraph on what I want to achieve', why: 'This is a test paragraph on why you should vote for me'};
    return (
        <div id= 'manifesto'>
            <div>
                <h1>{candidate.name}</h1>
                <h1>{candidate.position}</h1>
                <h1>{candidate.name}</h1>
            </div>
            <div>
                <div>
                    <p>{candidate.who}</p>
                    {(isAdmin || isCandidate) && <button>Edit</button>}
                </div>
                <div>
                    <p>{candidate.what}</p>
                </div>
                <div>
                    <p>{candidate.why}</p>
                </div>
            </div>
        </div>
    )
}
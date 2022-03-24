import React from "react";

export default function VoteConfirmation({ name, setClick }) {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => setClick(false)}>+</div>
                <h2>Are you sure you want to vote for {name}?</h2>
                <button>Yes</button>
                <button onClick={() => setClick(false)}>No</button>
            </div>
        </div>
    )
}
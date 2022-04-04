import React from "react";

export default function VoteConfirmation({ cancelHandler, proceedHandler }) {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => cancelHandler()}>+</div>
                <h2>Are you sure you wish to place your vote?</h2>
                <div className='confirmation-modal-flex'>
                    <button onClick={() => proceedHandler()}>Yes</button>
                    <button onClick={() => cancelHandler()}>No</button>
                </div>
            </div>
        </div>
    )
}
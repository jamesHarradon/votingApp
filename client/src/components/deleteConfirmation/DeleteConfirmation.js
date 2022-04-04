import React from "react";

export default function DeleteConfirmation({ cancelHandler, proceedHandler, name, deleteId, deleteElectionId }) {


    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => cancelHandler()}>+</div>
                <h2>Are you sure you wish to delete {name}?</h2>
                <div className='confirmation-modal-flex'>
                    <button onClick={() => proceedHandler(deleteId, deleteElectionId)}>Yes</button>
                    <button onClick={() => cancelHandler()}>No</button>
                </div>
            </div>
        </div>
    )
}
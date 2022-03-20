import React from "react";

export default function DeleteConfirmation({ cancelHandler, proceedHandler, name, deleteId }) {


    return (
        <div className='modal-container'>
            <div className='modal'>
                <h2>Are you sure you wish to delete {name}?</h2>
                <button onClick={() => proceedHandler(deleteId)}>Yes</button>
                <button onClick={() => cancelHandler()}>No</button>
            </div>
        </div>
    )
}
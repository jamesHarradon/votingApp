import React from 'react'

export default function RegisterConfirmation({ message, setRegisterModal }) {
    return (
        <div className='modal-container'>
            <div className='modal'>
                <div className='close' onClick={() => setRegisterModal(false)}>+</div>
                <h2>{message}</h2>
                <button onClick={() => setRegisterModal(false)}>OK</button>
            </div>
        </div>
    )
}
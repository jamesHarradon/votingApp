import React from 'react'

export default function EmptyHeader({ type }) {
  return (
    <div className='empty-header'>
        <h1>No {type} have been added to this election.</h1>
    </div>
  )
}

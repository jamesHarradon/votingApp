import React from 'react'
import ghLogo from '../../github.png'

export default function About() {
  return (
    <div id='app-about'>
        <div>
            <p>app built by James Harradon</p>
            <p>with PostgreSQL, Express, React and Node</p>
        </div>
        <a href='https://github.com/jamesHarradon/votingApp'><img src={ghLogo} alt='github logo'></img></a>
    </div>
  )
}

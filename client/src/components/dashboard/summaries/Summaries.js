import React from 'react';

export default function Summaries() {

    //summaries below will contain dynamic data from state

    return (
        <div id='summaries'>
            <div className='summary'>
                <h4>No. of candidates</h4>
                <p>4</p>
            </div>
            <div className='summary'>
                <h4>No. of voters</h4>
                <p>30</p>
            </div>
            <div className='summary'>
                <h4>Votes Cast</h4>
                <p>25</p>
            </div>
            <div className='summary'>
                <h4>Voters yet to vote</h4>
                <p>5</p>
            </div>
        </div>
    )
}
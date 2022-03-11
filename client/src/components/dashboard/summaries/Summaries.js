import React from "react";

export default function Summaries() {

    //summaries below will contain dynamic data from state

    return (
        <div id='summaries'>
            <div class='summary'>
                <h1>Number of candidates</h1>
                <p>4</p>
            </div>
            <div class='summary'>
                <h1>Number of voters</h1>
                <p>30</p>
            </div>
            <div class='summary'>
                <h1>Votes Cast</h1>
                <p>25</p>
            </div>
            <div class='summary'>
                <h1>Voters yet to vote</h1>
                <p>5</p>
            </div>
        </div>
    )
}
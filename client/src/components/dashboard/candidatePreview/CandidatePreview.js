import React from "react";

export default function CandidatePreview() {
    return (
        <div id='candidate-preview'>
            {/*this will map through candidates data and show candidate image - for now will replicate with p tag*/}
            <p class='candidate-image'>candidate one</p>  
            <p class='candidate-image'>candidate two</p> 
            <p class='candidate-image'>candidate three</p>  
            <p class='candidate-image'>candidate four</p> 
        </div>
    )
}
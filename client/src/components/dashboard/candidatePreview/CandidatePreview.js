import React from "react";


export default function CandidatePreview() {

    
    return (
        <div id='candidate-preview'>
            {/*this will map through candidates data and show candidate image - for now will replicate with p tag*/}
            <p className='candidate-image'>candidate one</p>  
            <p className='candidate-image'>candidate two</p> 
            <p className='candidate-image'>candidate three</p>  
            <p className='candidate-image'>candidate four</p> 
        </div>
    )
}
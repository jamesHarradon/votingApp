import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Manifesto() {

    const isAdmin = true; //this is to simulate if user is admin
    const isCandidate = true;

    const params = useParams();

    useEffect(() => {
        //something like dispatch(getManifesto(parseInt(params.id)) to show manifesto for correct candidate
    },[])

    const candidate = {first_name: 'James', last_name: 'Harradon', position: 'President', name: 'Position of Union President at Twitter', who: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat earum beatae repellendus. Voluptatum repellat ullam officia maxime saepe exercitationem incidunt, doloremque cupiditate, officiis ab ad repellendus neque dignissimos. Eaque, eius!', what: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde odit nulla, non, adipisci nisi error ea dolores odio obcaecati sequi voluptate veritatis sed! Voluptas facilis error culpa voluptatum minus eligendi.', why: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus sed fugit velit. Ab sapiente quidem assumenda expedita illum praesentium laborum aliquid, voluptate eius explicabo veritatis aperiam, quo, repellendus maiores. Corrupti!'};
    return (
        <div id= 'manifesto'>
            <div id='manifesto-head'>
                <h2>{`${candidate.first_name} ${candidate.last_name} `}</h2>
                <h2>{candidate.position}</h2>
                <h2>{candidate.name}</h2>
            </div>
            <div id='manifesto-body'>
                <div id='manifesto-who'>
                    <h2>Who Am I?</h2>
                    <p>{candidate.who}</p>
                    {(isAdmin || isCandidate) && <button>Edit</button>}
                </div>
                <div id='manifesto-what'>
                    <h2>What Do I Want To Achieve?</h2>
                    <p>{candidate.what}</p>
                    {(isAdmin || isCandidate) && <button>Edit</button>}
                </div>
                <div id='manifesto-why'>
                    <h2>Why Vote For Me?</h2>
                    <p>{candidate.why}</p>
                    {(isAdmin || isCandidate) && <button>Edit</button>}
                </div>
            </div>
        </div>
    )
}
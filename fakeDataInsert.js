
const { faker } = require('@faker-js/faker')
const pool = require('./db');
const { nanoid } = require('nanoid')

const addVoterData = async () => {
    try {
        for (let i = 0; i < 100; i++) {
            let first = faker.name.firstName();
            let last = faker.name.lastName();
            let arr = ['yahoo', 'gmail', 'hotmail']
            let email = `${first}.${last}@${arr[Math.floor(Math.random()*3)]}.com`
            let password = nanoid(10)
            await pool.query('INSERT INTO voter(email, first_name, last_name, password, role) VALUES ($1, $2, $3, $4, $5)', [email, first, last, password, 'voter'])
        }
        console.log('complete voter data')
        
    } catch (error) {
        console.log(error);
    }
}


const addCandidateData = async () => {
    try {
        for (let i = 0; i < 10; i++) {
            let first = faker.name.firstName();
            let last = faker.name.lastName();
            let arr = ['yahoo', 'gmail', 'hotmail']
            let email = `${first}.${last}@${arr[Math.floor(Math.random()*3)]}.com`
            let position = i % 2 === 0 ? 'President' : 'Vice President';
            let password = nanoid(10) 
            await pool.query('INSERT INTO candidate(email, first_name, last_name, position, password, role) VALUES ($1, $2, $3, $4, $5, $6)', [email, first, last, position, password, 'candidate'])
        }
        console.log('complete candidate data')
        
    } catch (error) {
        console.log(error);
    }
}

const addToData = async () => {
    try {
        for (let i = 151; i < 201; i++) {
            const e = 4;
            await pool.query('INSERT INTO election_voters(election_id, voter_id) VALUES($1, $2)', [e, i])
        }
        console.log('complete candidate data')
        
    } catch (error) {
        console.log(error);
    }
}





// const addPassword = async () => {
//     try {
//         for (let i = 1; i < 11; i++) {
//             await pool.query('UPDATE candidate SET password = $1 WHERE id = $2', [nanoid(10), i])
//         }
//         console.log('add pw complete')
//     } catch (error) {
//         console.log(error);
//     }
// }

// const updateElectionVoters = async () => {
//     try {
//         for (let i = 1; i < 101; i++) {
//             await pool.query('INSERT INTO election_voters (election_id, voter_id) VALUES ((SELECT election_id from voter WHERE id = $1), $1)', [i])
//         }
//         console.log('update complete')
//     } catch (error) {
//         console.log(error)
//     }
// }



// module.exports = {
//     addVoterData,
//     addCandidateData,
//     // addPassword,
//     // updateElectionVoters
// };

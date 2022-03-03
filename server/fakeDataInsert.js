
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
            await pool.query('INSERT INTO voter(email, first_name, last_name, password, has_voted) VALUES ($1, $2, $3, $4, $5)', [email, first, last, password, false])
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
            let position = i % 2 === 0 ? 'President' : 'Vice President' 
            await pool.query('INSERT INTO candidate(first_name, last_name, position, email) VALUES ($1, $2, $3, $4)', [first, last, position, email ])
        }
        console.log('complete candidate data')
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addVoterData,
    addCandidateData
};

const pool = require('../../db');
const { nanoid } = require('nanoid')

class VoterModel {

    async getAllVotersAdmin(id) {
        try {
            const data = await pool.query('SELECT voter.id, email, first_name, last_name, password, role, name FROM voter JOIN election_voters ON voter.id = election_voters.voter_id JOIN election ON election_voters.election_id = election.id WHERE election_id IN (SELECT election_id FROM admin_elections WHERE admin_id = $1)',[id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllVotersByElectionId(id) {
        try {
            const data = await pool.query('SELECT voter.id, email, first_name, last_name, password, role, name FROM voter JOIN election_voters ON voter.id = election_voters.voter_id JOIN election ON election_voters.election_id = election.id WHERE election_id = $1', [id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getVoterData(voterId, electionId) {
        try {
            const data = await pool.query('SELECT voter.id, email, first_name, last_name, password, role, name, date_of_election FROM voter JOIN election_voters ON voter.id = election_voters.voter_id JOIN election ON election_voters.election_id = election.id WHERE voter.id = $1 AND election.id = $2', [voterId, electionId]);
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }


    async addVoter(body) {
        try {
            const data = await pool.query('INSERT INTO voter (email, first_name, last_name, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *', [body.email, body.first_name, body.last_name, nanoid(10), 'voter']); 
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async getHasVoted(voterId, candidateId) {
        try {
            const data= await pool.query('SELECT * FROM voters_candidates WHERE voter_id = $1 AND election_id = $2', [voterId, candidateId]);
            return data.rows?.length ? true : false
        } catch (error) {
            throw new Error(error)
        }
    }

    async setHasVoted(voterId, candidateId, electionId) {
        try {
            const data = await pool.query('INSERT INTO voters_candidates (voter_id, candidate_id, election_id) VALUES ($1, $2, $3)RETURNING *', [voterId, candidateId, electionId]);
            return data.rows?.length ? {success: true} : {success: false}
        } catch (error) {
            throw new Error(error)
        }
    }

    async addToElectionVoters(electionId, voterId) {
        try {
            const data = await pool.query('INSERT INTO election_voters (election_id, voter_id) VALUES ($1, $2) RETURNING *', [electionId, voterId])
            return data.rows?.length ? {success: true} : {success: false}
        } catch (error) {
            throw new Error(error)
        }
    }

    async amendVoter(id, body) {
        try {
            let data;
            let arr = [];
            for (const property in body) {
                data = await pool.query(`UPDATE voter SET ${property} = $1 WHERE id = $2 RETURNING *`, [body[property], id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? {success: false} : {success: true} 
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteVoter(id) {
        try {
            await pool.query('DELETE FROM voter WHERE id = $1', [id]);
            const data = await pool.query('SELECT * FROM voter WHERE id = $1', [id]);
            return data.rows?.length ? {success: false} : {success: true} 
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = VoterModel;
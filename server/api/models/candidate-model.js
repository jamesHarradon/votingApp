const pool = require('../../db');
const { nanoid } = require('nanoid')

class CandidateModel {

    async getAllCandidates() {
        try {
            const data = await pool.query('SELECT * FROM candidate');
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllCandidatesByElectionId(id) {
        try {
            const data = await pool.query('SELECT * FROM candidate WHERE election_id = $1', [id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            
        }
    }

    async getCandidateById(id, electionId) {
        try {
            const data = await pool.query('SELECT candidate.id, email, first_name, last_name, position, manifesto_id, password, role, election_id, name, date_of_election FROM candidate JOIN election ON candidate.election_id = election.id WHERE candidate.id = $1 AND election.id = $2', [id, electionId]);
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addCandidate(body) {
        try {
            const data = await pool.query('INSERT INTO candidate (email, first_name, last_name, position, manifesto_id, election_id, password, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [body.email, body.first_name, body.last_name, body.position, body.manifesto_id, body.election_id, nanoid(10), 'candidate']); 
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addToElectionCandidates(electionId, candidateId) {
        try {
            const data = await pool.query('INSERT INTO election_candidates (election_id, candidate_id) VALUES ($1, $2) RETURNING *', [electionId, candidateId])
            return data.rows?.length ? {success: true} : {success: false}
        } catch (error) {
            throw new Error(error)
        }
    }

    async amendCandidate(id, body) {
        try {
            let data;
            let arr = [];
            for (const property in body) {
                data = await pool.query(`UPDATE candidate SET ${property} = $1 WHERE id = $2 RETURNING *`, [body[property], id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? {success: false} : {success: true} 
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteCandidate(id) {
        try {
            await pool.query('DELETE FROM candidate WHERE id = $1', [id])
            const data = await pool.query('SELECT * FROM candidate WHERE id = $1', [id]);
            return data.rows?.length ? {success: false} : {success: true} 
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = CandidateModel;
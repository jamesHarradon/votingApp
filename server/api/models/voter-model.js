const pool = require('../../db');
const { nanoid } = require('nanoid')

class VoterModel {

    async getAllVotersAdmin(id) {
        try {
            const data = await pool.query('SELECT * FROM voter WHERE election_id IN (SELECT election_id FROM admin_elections WHERE admin_id = $1)',[id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllVotersByElectionId(id) {
        try {
            const data = await pool.query('SELECT * FROM voter WHERE election_id = $1', [id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getVoterById(id) {
        try {
            const data = await pool.query('SELECT voter.id, email, first_name, last_name, password, role, election_id, name, date_of_election FROM voter JOIN election ON voter.election_id = election.id WHERE voter.id = $1', [id]);
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async getElectionIdByVoterId(id) {
        try {
            const data = await pool.query('SELECT election_id FROM voter WHERE id = $1', [id]);
            return data.rows?.length ? data.rows[0].election_id : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addVoter(body) {
        try {
            const data = await pool.query('INSERT INTO voter (email, first_name, last_name, password, has_voted, election_id, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [body.email, body.first_name, body.last_name, nanoid(10), false, body.election_id, 'voter']); 
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addToElectionVoters(electionId, voterId) {
        try {
            const data = await pool.query('INSERT INTO election_voters(election_id, voter_id) VALUES ($1, $2) RETURNING *', [electionId, voterId])
            return data.rows?.length ? {success: true} : {success: false}
        } catch (error) {
            throw new Error(error)
        }
    }

    //place a vote - add voters candidate selection to voters_candidates table
    async addToVotersCandidates(voterId, candidateId) {
        try {
            const data = await pool.query('INSERT INTO voters_candidates (voter_id, candidate_id, election_id) VALUES ($1, $2, (SELECT election_id FROM voter WHERE id = $1)) RETURNING *', [voterId, candidateId])
            return data.rows?.length ? {success: true} : {success: false}
        } catch (error) {
            throw new Error(error)
        }
    }

    async getHasVoted(voterId) {
        try {
            const data= await pool.query('SELECT has_voted FROM voter WHERE id = $1', [voterId]);
            return data.rows[0].has_voted;
        } catch (error) {
            throw new Error(error)
        }
    }

    async setHasVoted(voterId) {
        try {
            const data = await pool.query('UPDATE voter SET has_voted = true WHERE id = $1 RETURNING has_voted', [voterId]);
            return data.rows?.length && data.rows[0].has_voted ? {success: true} : {success: false}
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
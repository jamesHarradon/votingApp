const pool = require('../../db');

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

    async getCandidateById(id) {
        try {
            const data = await pool.query('SELECT * FROM candidate WHERE id = $1', [id]);
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addCandidate(body) {
        try {
            const data = await pool.query('INSERT INTO candidate (email, first_name, last_name, position, manifesto_id, election_id, password) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [body.email, body.first_name, body.last_name, body.position, body.manifesto_id, body.election_id, body.password]); 
            return data.rows?.length ? true : false
        } catch (error) {
            throw new Error(error)
        }
    }

    async amendCandidate(body) {
        try {
            let data;
            let arr = [];
            for (const property in data) {
                data = await pool.query(`UPDATE candidate SET ${property} = $1 WHERE id = $2 RETURNING *`, [data[property], body.id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? false : true 
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteCandidate(id) {
        try {
            await pool.query('DELETE FROM candidate WHERE id = $1', [id])
            const data = await pool.query('SELECT * FROM candidate WHERE id = $1', [id]);
            return data.rows?.length ? false : true
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = CandidateModel;
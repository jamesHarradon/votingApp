const pool = require('../../db');

class VoterModel {

    async getAllVoters() {
        try {
            const data = await pool.query('SELECT * FROM voter');
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
            const data = await pool.query('SELECT * FROM voter WHERE id = $1', [id]);
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addVoter(body) {
        try {
            const data = await pool.query('INSERT INTO voter (email, first_name, last_name, password, has_voted, election_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [body.email, body.first_name, body.last_name, body.password, false, body.election_id]); 
            return data.rows?.length ? true : false
        } catch (error) {
            throw new Error(error)
        }
    }

    async amendVoter(body) {
        try {
            let data;
            let arr = [];
            for (const property in data) {
                await pool.query(`UPDATE voter SET ${property} = $1 WHERE id = $2 RETURNING *`, [data[property], body.id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? false : true 
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteVoter(id) {
        try {
            await pool.query('DELETE FROM voter WHERE id = $1', [id]);
            const data = await pool.query('SELECT * FROM voter WHERE id = $1', [id]);
            return data.rows?.length ? false : true
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = VoterModel;
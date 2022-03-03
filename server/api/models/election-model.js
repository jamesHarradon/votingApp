const pool = require('../../db');

class ElectionModel {

    async getAllElections() {
        try {
            const data = await pool.query('SELECT * FROM election');
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getElectionById(id) {
        try {
            const data = await pool.query('SELECT * FROM election WHERE id = $1', [id]);
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addElection(body) {
        try {
            const data = await pool.query('INSERT INTO election (name, date_of_election, number_of_candidates, number_of_voters) VALUES ($1, $2, $3, $4) RETURNING *', [body.name, body.date_of_election, body.number_of_candidates, body.number_of_voters]); 
            return data.rows?.length ? true : false
        } catch (error) {
            throw new Error(error)
        }
    }

    async amendElection(body) {
        try {
            let data;
            let arr = [];
            for (const property in data) {
                await pool.query(`UPDATE election SET ${property} = $1 WHERE id = $2 RETURNING *`, [data[property], body.id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteElection(id) {
        try {
            await pool.query('DELETE FROM election WHERE id = $1', [id]);
            const data = await pool.query('SELECT * FROM election WHERE id = $1', [id]);
            return data.rows?.length ? false : true
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ElectionModel;
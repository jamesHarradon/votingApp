const pool = require('../../db');

class AuthModel {

    async findOne(email) {
        try {
            const admin = await pool.query('SELECT id, email, first_name, last_name, role FROM admin WHERE email = $1', [email]);
            if (admin.rows?.length) return admin.rows[0]
            const voter = await pool.query('SELECT id, email, first_name, last_name, has_voted, election_id, role FROM voter WHERE email = $1', [email]);
            if (voter.rows?.length) return voter.rows[0]
            const candidate = await pool.query('SELECT id, email, first_name, last_name, position, manifesto_id, election_id, role FROM candidate WHERE email = $1', [email]);
            if (candidate.rows?.length) return candidate.rows[0]
        } catch (error) {
            throw new Error(error)
        }
    }

    async getPassword(email, role) {
        try {
            const data = await pool.query(`SELECT password FROM ${role} WHERE email = $1`, [email]);
            return data.rows?.length ? data.rows[0].password : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async findById(id, role) {
        try {
            const data = await pool.query(`SELECT * FROM ${role} WHERE id = $1`, [id])
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = AuthModel;
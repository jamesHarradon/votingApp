const pool = require('../../db');

class AuthModel {

    async findOne(email) {
        try {
            const adminData = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);
            if (adminData.rows?.length) return adminData.rows[0]
            const data = await pool.query('SELECT * FROM (SELECT id, email, password, role, election_id FROM voter UNION SELECT id, email, password, role, election_id FROM candidate) AS users WHERE email = $1', [email]);
            return data.rows?.length ? data.rows[0] : null
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
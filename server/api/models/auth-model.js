const pool = require('../../db');

class AuthModel {

    async findOne(email) {
        try {
            const data = await pool.query('SELECT * FROM (SELECT id, email, password, role FROM voter UNION SELECT id, email, password, role FROM candidate UNION SELECT id, email, password, role FROM admin) AS users WHERE email = $1', [email]);
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
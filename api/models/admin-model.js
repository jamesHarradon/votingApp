const pool = require('../../db');
const { nanoid } = require('nanoid')

class AdminModel {
    async register(body) {
        try {
            const data = await pool.query('INSERT INTO admin(email, first_name, last_name, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *', [body.email, body.first_name, body.last_name, nanoid(10), 'admin']);
            return data.rows?.length ? {message: 'Thank you for registering. An email has been sent to you containing your temporary login password.', data: data.rows[0]} : null
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = AdminModel;
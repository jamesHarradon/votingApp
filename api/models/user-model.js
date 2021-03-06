const pool = require('../../db');

class UserModel {

    async getPasswordByIdAndRole(id, role) {
        try {
            const data = await pool.query(`SELECT password FROM ${role} WHERE id = $1`, [id]);
            return data.rows?.length ? data.rows[0].password : null 
        } catch (error) {
            throw new Error(error);
        }
    }

    async amendUser(id, role, body) {
        try {
            let data;
            let arr = [];
            for (const property in body) {
                data = await pool.query(`UPDATE ${role} SET ${property} = $1 WHERE id = $2 RETURNING *`, [body[property], id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? {success: false} : {success: true};
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = UserModel;
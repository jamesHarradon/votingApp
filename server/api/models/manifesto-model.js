const pool = require('../../db');

class ManifestoModel {

    async getManifestoById(id) {
        try {
            const data = await pool.query('SELECT * FROM manifesto WHERE id = $1', [id]);
            return data.rows?.length ? data.rows[0] : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async addManifesto(body) {
        try {
            const data = await pool.query('INSERT INTO manifesto (candidate_id, who, what, why) VALUES ($1, $2, $3, $4) RETURNING *', [body.candidate_id, body.who, body.what, body.why]);
            const id = data.rows[0].id;
            await pool.query('UPDATE candidate SET manifesto_id = $1 WHERE id = $2', [id, body.candidate_id])
            return data.rows?.length ? true : false
        } catch (error) {
            throw new Error(error)
        }
    }

    async amendManifesto(body) {
        try {
            let data;
            let arr = [];
            for (const property in data) {
                data = await pool.query(`UPDATE manifesto SET ${property} = $1 WHERE id = $2 RETURNING *`, [data[property], body.id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? false : true 
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteManifesto(id) {
        try {
            await pool.query('DELETE FROM manifesto WHERE id = $1', [id])
            const data = await pool.query('SELECT * FROM manifesto WHERE id = $1', [id]);
            return data.rows?.length ? false : true
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ManifestoModel;
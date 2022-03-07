const pool = require('../../db');

class ManifestoModel {

    async getManifestoByCandidateId(id) {
        try {
            const data = await pool.query('SELECT * FROM manifesto WHERE candidate_id = $1', [id]);
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
            return data.rows?.length ? {success: true} : {success: false}
        } catch (error) {
            throw new Error(error)
        }
    }

    async amendManifesto(id, body) {
        try {
            let data;
            let arr = [];
            for (const property in body) {
                data = await pool.query(`UPDATE manifesto SET ${property} = $1 WHERE candidate_id = $2 RETURNING *`, [body[property], id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? {success: false} : {success: true} 
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteManifesto(id) {
        try {
            await pool.query('DELETE FROM manifesto WHERE id = $1', [id])
            const data = await pool.query('SELECT * FROM manifesto WHERE id = $1', [id]);
            return data.rows?.length ? {success: false} : {success: true} 
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ManifestoModel;
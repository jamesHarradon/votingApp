const pool = require('../../db');

class ElectionModel {

    async getAllElectionsAdmin(id) {
        try {
            const data = await pool.query('SELECT * FROM election WHERE id IN (SELECT election_id FROM admin_elections WHERE admin_id = $1)',[id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllElectionIdsAdmin(id) {
        try {
            const data = await pool.query('SELECT id FROM election WHERE id IN (SELECT election_id FROM admin_elections WHERE admin_id = $1)',[id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllElectionsVoter(id) {
        try {
            const data = await pool.query('SELECT * FROM election WHERE id IN (SELECT election_id FROM election_voters WHERE voter_id = $1)', [id]);
            return data.rows?.length ? data.rows : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAllElectionIdsVoter(id) {
        try {
            const data = await pool.query('SELECT id FROM election WHERE id IN (SELECT election_id FROM election_voters WHERE voter_id = $1)',[id]);
            return data.rows?.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getElectionIdByCandidateId(id) {
        try {
            const data = await pool.query('SELECT election_id FROM election_candidates WHERE candidate_id = $1', [id]);
            return data.rows?.length ? data.rows[0].election_id : null
        } catch (error) {
            throw new Error(error)
        }
    }

    async getElectionById(id) {
        try {
            const data = await pool.query('SELECT * FROM election WHERE id = $1', [id]);
            return data.rows?.length ? data.rows[0] : null;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addElection(body) {
        try {
            const data = await pool.query('INSERT INTO election (name, date_of_election, number_of_candidates, number_of_voters) VALUES ($1, $2, $3, $4) RETURNING *', [body.name, body.date_of_election, 0, 0]); 
            return data.rows?.length ? {success: true, election_id: data.rows[0].id} : {success: false}
        } catch (error) {
            throw new Error(error)
        }
    }

    async incrementVoterCandidate(electionId, type) {
        try {
            if(type === 'candidate') {
                await pool.query('UPDATE election SET number_of_candidates = number_of_candidates + 1 WHERE id = $1', [electionId])
            }
            if(type === 'voter') {
                await pool.query('UPDATE election SET number_of_voters = number_of_voters + 1 WHERE id = $1', [electionId])
            }  
        } catch (error) {
            throw new Error(error)
        }
    }

    async decrementVoterCandidate(electionId, type) {
        try {
            if(type === 'candidate') {
                await pool.query('UPDATE election SET number_of_candidates = number_of_candidates - 1 WHERE id = $1', [electionId])
            }
            if(type === 'voter') {
                await pool.query('UPDATE election SET number_of_voters = number_of_voters - 1 WHERE id = $1', [electionId])
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async addToAdminElections(adminId, electionId) {
        try {
            const data = await pool.query('INSERT INTO admin_elections (admin_id, election_id) VALUES ($1, $2) RETURNING *', [adminId, electionId]);
            return data.rows?.length ? {success: true, election_id: electionId} : {success: false};
        } catch (error) {
           throw new Error(error); 
        }
    }

    async amendElection(id, body) {
        try {
            let data;
            let arr = [];
            for (const property in body) {
                data = await pool.query(`UPDATE election SET ${property} = $1 WHERE id = $2 RETURNING *`, [body[property], id]);
                data.rows?.length ? arr.push(true) : arr.push(false);
            }
            return arr.includes(false) ? {success: false} : {success: true}
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteElection(id) {
        try {
            await pool.query('DELETE FROM election WHERE id = $1', [id]);
            const data = await pool.query('SELECT * FROM election WHERE id = $1', [id]);
            return data.rows?.length ? {success: false} : {success: true}
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = ElectionModel;
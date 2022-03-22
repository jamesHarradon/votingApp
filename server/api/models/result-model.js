const pool = require('../../db');

class ResultModel {
    async getResultsByAdmin(id) {
        try {
            const data = await pool.query('SELECT * FROM voters_candidates WHERE election_id IN (SELECT election_id FROM admin_elections WHERE admin_id =$1)', [id]);
            return data?.rows.length ? data.rows : null;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getResultByElection(id) {
        try {
            const data = await pool.query('SELECT * FROM voters_candidates WHERE election_id = $1)', [id]);
            return data?.rows.length ? data.rows : null; 
        } catch (error) {
            throw new Error(error)
        }
    }

    async getVotedCandidateByVoter(id) {
        try {
            const data = await pool.query('SELECT candidate.id, email, first_name, last_name, position, manifesto_id, election_id, name, who, what, why FROM candidate JOIN election ON election_id = election.id JOIN manifesto ON manifesto_id = manifesto.id WHERE candidate.id = (SELECT candidate_id FROM voters_candidates WHERE voter_id = $1)', [id]);
            return data?.rows.length ? data.rows[0] : null; 
        } catch (error) {
            throw new Error(error)
        }
    }

    async getResults(electionId) {
        try {
            const data = await pool.query('SELECT candidate_id, first_name, last_name, email, position, role, name, COUNT(candidate_id) AS votes FROM voters_candidates vc JOIN candidate c ON vc.candidate_id = c.id JOIN election e ON e.id = c.election_id WHERE vc. election_id = $1 GROUP BY candidate_id, first_name, last_name, email, position, role, name ORDER BY 8 DESC', [electionId]);
            return data.rows?.length ? data : null
        } catch (error) {
            throw new Error(error)
        } 
    }
}

module.exports = ResultModel;
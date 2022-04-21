import request from 'supertest';
import app from '../app';
import { getCookie } from './test-utils'

describe("POST /api/candidate", () => {

    describe("Fetching all candidates by id", () => {
        test("it returns a 200 status code", async () => {
            const cookie = await getCookie('james.harradon@gmail.com', 'testerAdmin1')
            const response = await request(app)
            .get("/api/candidate/election/1")
            .set('Cookie', cookie)
            expect(response.statusCode).toBe(200);
        })
    })

    describe("Fetch single candidate by id", () => {
        test("it returns a 200 status code", async () => {
            const cookie = await getCookie('james.harradon@gmail.com', 'testerAdmin1')
            const response = await request(app)
            .get("/api/candidate/1/1")
            .set('Cookie', cookie)
            expect(response.statusCode).toBe(200);
        })
        test("it returns a candidate", async () => {
            const cookie = await getCookie('james.harradon@gmail.com', 'testerAdmin1')
            const response = await request(app)
            .get("/api/candidate/1/2")
            .set('Cookie', cookie)
            expect(response.body).toMatchObject({
                id: 1, 
                email: 'Krystal.Goyette@gmail.com', 
                first_name: 'Krystal', 
                last_name: 'Goyette',
                manifesto_id: 3,
                password: 'slnyv6pPzm',
                role: 'candidate',
                election_id: 2,
                name: 'Position of President at Facebook',
                date_of_election: '2022-06-09T23:00:00.000Z'             
            })
        })
    })

})
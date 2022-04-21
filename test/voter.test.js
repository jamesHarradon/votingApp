import request from 'supertest';
import app from '../app';
import { getCookie } from './test-utils'

describe("GET /api/voter", () => {

    describe("Fetching all voters by election id", () => {
        test("it returns a 200 status code", async () => {
            const cookie = await getCookie('james.harradon@gmail.com', 'testerAdmin1')
            const response = await request(app)
            .get("/api/voter/election/1")
            .set('Cookie', cookie)
            expect(response.statusCode).toBe(200);
        })
    })

    describe("Fetch single voter by id", () => {
        test("it returns a 200 status code", async () => {
            const cookie = await getCookie('james.harradon@gmail.com', 'testerAdmin1')
            const response = await request(app)
            .get("/api/voter/1/1")
            .set('Cookie', cookie)
            expect(response.statusCode).toBe(200);
        })
        test("it returns a voter", async () => {
            const cookie = await getCookie('james.harradon@gmail.com', 'testerAdmin1')
            const response = await request(app)
            .get("/api/voter/1/1")
            .set('Cookie', cookie)
            expect(response.body).toMatchObject({
                id: 1, 
                email: 'Lenora.Bode@hotmail.com', 
                first_name: 'Lenora', 
                last_name: 'Bode',
                password: 'RPgnSaTHxG',
                role: 'voter',
                name: 'Position of Union Vice President at Twitter',
                date_of_election: '2022-06-09T23:00:00.000Z'             
            })
        })
    })

})
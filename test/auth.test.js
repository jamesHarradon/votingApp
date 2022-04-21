import request from 'supertest'
import app from '../app'


describe("POST /api/auth/login", () => {

    describe("Successful login", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(app).post("/api/auth/login").send({
                email: "james.harradon@gmail.com",
                password: "testerAdmin1"
            })
            expect(response.statusCode).toBe(200);
        })
    })

    describe("Unsuccessful login", () => {
        test("should respond with a 500 status code with wrong email", async () => {
            const response = await request(app).post("/api/auth/login").send({
                email: "wrong.email@gmail.com",
                password: "testerAdmin1"
            })
            expect(response.statusCode).toBe(500);
        })
        test("should respond with a 500 status code with wrong password", async () => {
            const response = await request(app).post("/api/auth/login").send({
                email: "james.harradon@gmail.com",
                password: "wrongPassword"
            })
            expect(response.statusCode).toBe(500);
        })
    })

    describe("Login response data", () => {
        test("should return user data", async () => {
            const response = await request(app).post("/api/auth/login").send({
                email: "james.harradon@gmail.com",
                password: "testerAdmin1"
            })
            expect(response.body).toMatchObject({
                election_ids:[1, 2, 13, 15, 30, 31],
                id: 1, 
                email: 'james.harradon@gmail.com', 
                first_name: 'Jim', 
                last_name: 'Harradon',             
            })
        })
    })
})

describe("POST /api/auth/logout", () => {
    describe("Logout", () => {
        test("should return status code of 200 on logout", async () => {
            const response = await request(app).post("/api/auth/logout");
            expect(response.statusCode).toBe(200);
        })
    })
})


const request = require('supertest');
const app = require('../app')

const getCookie = async (email, pw) => {
    const response = await request(app).post("/api/auth/login").send({
        email: email,
        password: pw
    })
    return response.header['set-cookie'];
}

module.exports = {
    getCookie
}
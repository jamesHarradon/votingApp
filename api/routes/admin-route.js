const express = require('express');
const passport = require('passport');
const AdminService = require('../services/admin-service');
const { sendInitialMail, sendAdminRegisterMail } = require('../../modules/nodemailer');

const AdminServiceInstance = new AdminService;

const adminRouter = express.Router();

adminRouter.post('/register', async (req, res, next) => {
    try {
        const response = await AdminServiceInstance.register(req.body);
        response.data && sendAdminRegisterMail(response.data);
        res.json(response)
    } catch (error) {
        next(error)
    }
})

module.exports = adminRouter;
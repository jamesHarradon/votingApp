const nodemailer = require('nodemailer');
require('dotenv').config();
const { DateTime } = require('luxon')

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
});

const sendInitialMail = (data) => {
    // date not working
    const date = DateTime.fromISO(data.date_of_election).setLocale('en-gb').toLocaleString() 
    const message = {
        from: 'tester@voting-app.com', // Sender address
        to: 'to@email.com',         // List of recipients
        subject: 'Voter App Login', // Subject line
        html: `<h1>Voting App</h1>
        <br><h2>Hi ${data.first_name}, you have been registered as a ${data.role} in Election: ${data.name}. Please see your login details below.</h2>
        <br><p>Email: ${data.email}</p>
        <br><p>Password: ${data.password}</p>
        <br><p>Please take a note of the date of the election: ${data.date_of_election}</p>
        <br><p>Link to site</p>
        <br><h2>Thank You</h2>
        <br><h2>Voting App Team</h2>`
    };
    transport.sendMail(message, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })
}

const sendVoteConfirmationMail = (data) => {
    const message = {
        from: 'tester@voting-app.com', // Sender address
        to: 'to@email.com',         // List of recipients
        subject: 'Voter App Vote', // Subject line
        html: `<h1>Voting App</h1>
        <br><h2>Hi ${data.first_name}, your vote in Election: ${data.name} has been registered.</h2>
        <br><h2>Please login to your account the the day after the election to check the results.</h2>
        <br><h2>Thank You</h2>
        <br><h2>Voting App Team</h2>`
    };
    transport.sendMail(message, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })
}

module.exports = {
    sendInitialMail,
    sendVoteConfirmationMail
} 
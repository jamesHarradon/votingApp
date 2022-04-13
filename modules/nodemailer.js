const nodemailer = require('nodemailer');
require('dotenv').config();
const { DateTime } = require('luxon')

const transportMailTrap = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
    }
});

const transportReal = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

// email html uses table instead of div as outlook doesnt support styling divs!

const sendAdminRegisterMail = (data) => {
    const message = {
        from: 'info@voter.com', // Sender address
        to: data.email,         // List of recipients
        subject: 'Voter App Admin Register', // Subject line
        html: `<table style="margin: 5%; padding: 2%; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; background: #eee;">
        <tbody>
            <tr>
                <td style="width: 70%;">
                    <h1><img alt="'Voter logo" width="24" height="24" src="https://th.bing.com/th/id/R.2f5161fa94808aa867bc102df65bb072?rik=J3G%2b4O3fL5btuw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_554644.png&ehk=9PSdiaDAm1hHvMLTiFAH%2f5XqKUOkW1lcY9DDvJvQGbk%3d&risl=&pid=ImgRaw&r=0" >Voter</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 2%;">
                    <p>Hi ${data.first_name}, you have been registered on Voter App as Admin.<br><br> You can now set up Elections and add Candidates and Voters. Please take note of your login details below. We encourage you to change your password after logging in.</p>
                    <p><b>Email:</b> ${data.email}</p>
                    <p><b>Password:</b> ${data.password}</p>
                    <p>Click <a href='https://jims-voting-app.netlify.app'>here</a> to return to Voter.</p>
                    <p>Thank You</p>
                    <h3>Voter Team</h3>
                </td>
            </tr>
        </tbody>
    </table>  `
    };
    transportReal.sendMail(message, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })
}

const sendInitialMail = (data) => {
    // date not working
    const dateFormated = DateTime.fromISO(data.date_of_election).setLocale('en-gb').toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY) 
    const message = {
        from: 'info@voter.com', // Sender address
        to: 'to@email.com',         // List of recipients
        subject: 'Voter App Login', // Subject line
        html: `<table style="margin: 5%; padding: 2%; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; background: #eee;">
            <tbody>
                <tr>
                    <td style="width: 70%;">
                        <h1><img alt="'Voter logo" width="24" height="24" src="https://th.bing.com/th/id/R.2f5161fa94808aa867bc102df65bb072?rik=J3G%2b4O3fL5btuw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_554644.png&ehk=9PSdiaDAm1hHvMLTiFAH%2f5XqKUOkW1lcY9DDvJvQGbk%3d&risl=&pid=ImgRaw&r=0" >Voter</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 2%;">
                        <p>Hi ${data.first_name}, you have been registered as a ${data.role} in Election: ${data.name}. Please see your login details below.</p>
                        <p>Email: ${data.email}</p>
                        <p>Password: ${data.password}</p>
                        <p>Please take note of the date of the election: ${dateFormated}</p>
                        <p>Click <a href='https://jims-voting-app.netlify.app'>here</a> to return to Voter.</p>
                        <p>Thank You</p>
                        <h3>Voter Team</h3>
                    </td>
                </tr>
            </tbody>
        </table> `
    };
    transportMailTrap.sendMail(message, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })
}

const sendVoteConfirmationMail = (data) => {
    const message = {
        from: 'info@voter.com', // Sender address
        to: 'to@email.com',         // List of recipients
        subject: 'Voter App Vote', // Subject line
        html: `<table style="margin: 5%; padding: 2%; font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; background: #eee;">
            <tbody>
                <tr>
                    <td style="width: 70%;">
                        <h1><img alt="'Voter logo" width="24" height="24" src="https://th.bing.com/th/id/R.2f5161fa94808aa867bc102df65bb072?rik=J3G%2b4O3fL5btuw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_554644.png&ehk=9PSdiaDAm1hHvMLTiFAH%2f5XqKUOkW1lcY9DDvJvQGbk%3d&risl=&pid=ImgRaw&r=0" >Voter</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 2%;">
                        <p>Hi ${data.first_name}, your vote in Election: ${data.name} has been registered.</p>
                        <p>Please login to your account the the day after the election to check the results.</p>
                        <p>Thank You</p>
                        <h3>Voting App Team</h3>
                    </td>  
                </tr>
            </tbody>
        </table> `
    };
    transportMailTrap.sendMail(message, (err, info) => {
        if(err) {
            console.log(err)
        } else {
            console.log(info);
        }
    })
}

module.exports = {
    sendAdminRegisterMail,
    sendInitialMail,
    sendVoteConfirmationMail
} 
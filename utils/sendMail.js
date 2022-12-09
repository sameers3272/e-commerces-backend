const nodeMailer = require("nodemailer");

const sendMail = async (options) => {


    const transpoter = nodeMailer.createTransport({
        host:"smpt.gmail.com",
        port:456,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },

    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        html: options.message,
}

    await transpoter.sendMail(mailOptions);
}


module.exports = sendMail;
const nodemailer = require("nodemailer");
const MailGunTransport = require("nodemailer-mailgun-transport");

const transporter = nodemailer.createTransport(MailGunTransport({
    auth: {
        domain: "sandboxe8a5daf9f1b74c44b30dba8752732c2f.mailgun.org", 
        api_key: "dd06fce80b2918b2f8f09d3e56535f41-0f1db83d-25c6f5bb" 
    }
}));

const mailerService = {
    sendEmail: (data) => {
        return new Promise((resolve, reject) => {
            try {
                const mailerOptions = {
                    to: data.email,
                    from: "20r21a1212@mlrinstitutions.ac.in", // Use a verified sender email
                    subject: "Password Reset Request",
                    html: `
                        <p>Hi ${data.firstName} ${data.lastName},</p>
                        <h4 style="color: blue;">Forgot your password?</h4>
                        <p>If you want to reset your password, click on the link below (or copy and paste the URL in your browser)</p>
                        <a href="http://localhost:3001/reset-password?email=${data.email}" target="_blank">Reset Password</a>
                    `
                };
                transporter.sendMail(mailerOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        return reject(error);
                    }
                    resolve(info);
                });
            } catch (error) {
                console.error("Error in sendEmail function:", error);
                reject(error);
            }
        });
    }
};

module.exports = mailerService;

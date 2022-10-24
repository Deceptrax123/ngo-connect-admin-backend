require("dotenv").config();
const nodemailer=require("nodemailer");
const nodemailerSendgrid=require("nodemailer-sendgrid");

const transporter=nodemailer.createTransport(nodemailerSendgrid({
    apiKey:process.env.SENDGRID_KEY,
}))

module.exports=transporter;
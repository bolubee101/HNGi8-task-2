const nodemailer = require('nodemailer');
const {config} = require('dotenv')

config()

const service='gmail'

const senderObject = {
  user: process.env.AUTH_EMAIL || 'youremail@gmail.com',
  pass: process.env.AUTH_PASS || 'yourpassword'
}
console.log(senderObject)
const transporter = nodemailer.createTransport({
  service,
  auth: senderObject,
});

const sendMail = ( 
  to='youremail@gmail.com', 
  subject="For you", 
  text="You, yes you, you are the definition of amazing. Everything is going to be all right",
  bcc=null
) => {
  try {
    const mailOptions = {
      from: senderObject.user,
      to,
      subject,
      text
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return
      } else {
        console.log('Email sent: ' + info.response);
        return info.response
      }
    });
  } catch (error) {
    console.log(error)
    return
  }
}

module.exports.sendMail = sendMail
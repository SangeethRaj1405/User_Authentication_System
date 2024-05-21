const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const User = require("../modelss/user");


exports.createUser = async (request, response) => {
  const { name, email, phone, password } = request.body;

  try {
      let user = await User.findOne({ email });
      if (user) {
          return response.json({
              error: "true"
          });
      }

      // JWT token for account activation
      const token = jwt.sign(
          {name, email, phone, password },
          "shfbsegr74wuhdsijkkseer873w6837r3356328hdcshfssi376",
          { expiresIn: "10m" }
      );

      // Setting up NodeMailer Transporter
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: "verifyuser364",
              pass: "zviq hruv jotb sakg"
          }
      });

      
      const mail = {
          from: 'verifyuser364@gmail.com',
          to: email,
          subject: 'ACTIVATE YOUR ACCOUNT',
          html: `
              <h1>Hey ${name} click the link below to activate your account</h1>
              <p>http://localhost:3000/auth/register/${token}</p>
              <hr /> 
          `
      };

     
      transporter.sendMail(mail, (error, info) => {
          if (error) {
              console.error('Error sending email:', error);
              return response.status(500).json({ error: 'Failed to send activation email' });
          } else {
              console.log('Email sent: ' + info.response);
              return response.json({
                  message: `A mail is sent to ${email}. Please activate your account.`
              });
          }
      });
  } catch (err) {
      console.error('SIGNUP ERROR', err);
      return response.status(400).json({
          error: err.message
      });
  }
};
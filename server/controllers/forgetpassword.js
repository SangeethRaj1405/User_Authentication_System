const User = require("../modelss/user")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                error: 'User with that email does not exist'
            });
        }

        // Generating a JWT token for Reset Password
        const token = jwt.sign({ _id: user._id }, "shfbsegr74wuhdsijkkseer873w6837r3356328hdcshfssi376", { expiresIn: '10m' });

        // Update user's reset password link
        await user.updateOne({ resetpass: token });

        // Setting up NodeMailer Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "verifyuser364",
                pass: "zviq hruv jotb sakg"
            }
        });

        // Email data
        const mailOptions = {
            from: 'verifyuser364@gmail.com', 
            to: email,
            subject: 'RESET YOUR PASSWORD',
            html: `
                <h1>Hey ${User.name} you can change your Password by Clicking the Link Below</h1>
                <p>http://localhost:3000/reset/${token}</p>
                <hr />
            ` 
        };
        // Sending email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send password reset email' });
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({
                    message: `Password reset link has been sent to ${email}`
                });                
            }
        });
    }
    catch (err) {
        console.error('FORGOT PASSWORD ERROR', err);
        return res.status(400).json({
            error: err.message
        }); 
    }
}
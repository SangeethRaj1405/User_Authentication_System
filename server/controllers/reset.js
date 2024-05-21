const User = require("../modelss/user");
const bcrypt = require('bcrypt');
exports.reset = async (req, res) => {
    const { resetpass, newPassword } = req.body;

    if (resetpass) {
        try {
            const user = await User.findOne({ resetpass }).exec();
            if (!user) {
                return res.status(400).json({
                    error: 'Something went wrong. Try later'
                });
            }
            const hashedpassword = await bcrypt.hash(newPassword,10);
            const updatedFields = {
                password: hashedpassword,
                resetpass: ''   
            };
            Object.assign(user, updatedFields);
            await user.save();

            return res.json({
                message: "Your new password is "
            });
        } catch (err) {
            return res.status(400).json({
                error: 'Expired link. Try again'
            });
        }
    }
};
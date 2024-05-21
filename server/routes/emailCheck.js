const express = require('express');
const router = express.Router();
const User = require('../modelss/user');

router.post('/check-email', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: 'This email is already available' });
    }
    // If email doesn't exist in the database, do nothing
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

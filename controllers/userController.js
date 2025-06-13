const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Équivalent de .find() dans Mongoose
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = { create, login, checkToken };

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);  // Create token. (It's a string!)
    res.json(token);  // Respond with JSON.
  } catch(err) {
    res.status(400).json(err);  // Set return status to 'Bad Request'.
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if(user && await bcrypt.compare(req.body.password, user.password)) {
      // Password was entered successfully.
      const token = createJWT(user);  // Create token. (It's a string!)
      res.json(token);  // Respond with JSON.
    } else {
      // Invalid email or wrong password.
      throw new Error('Bad Credentials');
    }
  } catch(err) {
    res.status(400).json(err);  // Set return status to 'Bad Request'.
  }
}

function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}

// Helper functions:

function createJWT(user) {
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'});
}

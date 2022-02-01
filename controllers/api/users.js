const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = { create };

async function create(req, res) {
  console.log('creating');
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);  // Create token. (It's a string!)
    res.json(token);  // Respond with JSON.
  } catch(err) {
    res.status(400).json(err);  // Set return status to 'Bad Request'.
  }
}


// Helper functions:

function createJWT(user) {
  return jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'});
}

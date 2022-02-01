const jwt = require('jsonwebtoken');

module.exports = function(req, resq, next) {
  let token = req.get('Authorization') || req.query.token;
  if(token) {
    token = token.replace('Bearer ', '');  // Wasteful.
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      // 'err' will be set if token is invalid. (Duh.)
      req.user = err ? null : decoded.user;
      req.exp = err ? null : new Date(decoded.exp * 1000);  // Check expiration date (optional).
      return next();
    });
  } else {
    req.user = null;
    return next();
  }
};

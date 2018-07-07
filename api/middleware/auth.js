var jwt = require('jsonwebtoken');

module.exports.authenticate  = (req, res, next) => {
  let config = req.app.get('config');
  var accesstoken = req.headers.accesstoken || "";
  var decoded;
  try {
    decoded = jwt.verify(accesstoken, config.jwtSecret);
  } catch(err) {
    res.status(401).json({error:"Invalid accesstoken"});
    return;
  }
  req.user = decoded.user;
  next();
};

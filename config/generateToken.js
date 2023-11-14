const jwt = require("jsonwebtoken"); // jwt = json web token

const generateToken = (id) => {

  return jwt.sign({ id }, process.env.JWT_SECRET); 
  
  // generating token for 30 days
};

module.exports = generateToken; 
// exporting modules of generateToken

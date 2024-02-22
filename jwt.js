
const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

// first check request headers has authorization or not
const authorization = req.headers.authorization
if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

  // extract jwt token from the request headers
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // attach user information to the request client
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

// function to generate token
const generateToken = (userData) => {
  // generate a new jwt token using user data
  return jwt.sign(userData, process.env.JWT_SECRET_KEY,{expiresIn:3000});
};

module.exports = { jwtAuthMiddleware, generateToken };

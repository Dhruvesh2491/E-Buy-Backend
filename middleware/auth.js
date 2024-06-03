const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }


  const tokenWithoutPrefix = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(tokenWithoutPrefix, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;

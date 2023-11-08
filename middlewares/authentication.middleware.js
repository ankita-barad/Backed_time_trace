const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    const isTokenValid = jwt.verify(token, process.env.accessSecretKey);

    if (!isTokenValid) {
      return res.status(400).send({ message: "Unnauthorized access token" });
    }

    req.userId = isTokenValid.userId;
    console.log(req.userId);
    req.email = isTokenValid.email;
    next();
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  authenticate,
};

const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-errors");

module.exports = (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: bearer token
    if (!token) {
      return next(new HttpError("authentication failed", 403));
    }
    const decodedToken = jwt.verify(token, process.env.JWT_key);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (e) {
    if (!token) {
      return next(new HttpError("authentication failed", 403));
    }
  }
};

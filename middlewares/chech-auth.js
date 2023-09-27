import { verify } from "jsonwebtoken";

import HttpError from "../models/error-model";

export default (req, res, next) => {
  if (req.method === "OPTION") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: bearer token
    if (!token) {
      return next(new HttpError("authentication failed", 403));
    }
    const decodedToken = verify(token, proccess.env.JWT_KEY || "JWT-key");
    req.userData = {
      userId: decodedToken.userId,
      username: decodedToken.username,
    };
    next();
  } catch (e) {
    if (!token) {
      return next(new HttpError("authentication failed", 403));
    }
  }
};

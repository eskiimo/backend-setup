const HttpError = require("../models/http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    // users = await User.find({});
    users = await User.find({}, "-password");
  } catch (e) {
    return next(HttpError("Something went wrong, couldn't find place", 500));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data", 422));
  }
  const { name, email, password } = req.body;
  let hasUser;
  try {
    hasUser = await User.findOne({ email: email });
  } catch (e) {
    return next(new HttpError("Signing failed, try again ...", 500));
  }
  if (hasUser) {
    return next(new HttpError("email already exist, login instead", 422));
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    console.log("didnt hash password");
    return next(new HttpError("could not hash password, try again later", 500));
  }
  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    image: req.file.path,
    places: [],
  });
  try {
    await createdUser.save();
  } catch (e) {
    console.log(e.errors);
    const error = new HttpError("Signing failed, try again ...", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
      },
      process.env.JWT_key,
      { expiresIn: "1h" }
    );
  } catch (e) {
    console.log("didn't generate jwt ");
    return next(new HttpError("Signing failed, try again ...", 500));
  }

  res.status(201).json({ userId: createdUser.id, token: token });
  // getters = true removes the _ from the id
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let identifiedUser;
  try {
    identifiedUser = await User.findOne({ email: email });
  } catch (e) {
    console.log(e);
    return next(new HttpError("something went wrong, try again", 500));
  }

  if (!identifiedUser) {
    console.log(identifiedUser);
    return next(new HttpError("could not identify user or unauthorized", 401));
  }

  let isValidpass = false;
  try {
    isValidpass = await bcrypt.compare(password, identifiedUser.password);
  } catch (e) {
    return next(
      new HttpError("Could not log in, please check your password", 401)
    );
  }
  if (!isValidpass) {
    return next(
      new HttpError("Could not log in, please check your password", 403)
    );
  }
  let token;
  try {
    token = jwt.sign(
      {
        userId: identifiedUser.id,
        email: identifiedUser.email,
      },
      process.env.JWT_key,
      { expiresIn: "1h" }
    );
  } catch (e) {
    console.log("didn't generate jwt ");
    return next(new HttpError("logging in failed, try again ...", 500));
  }

  res.status(201).json({
    message: "logged in",
    userId: identifiedUser.id,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

const HttpError = require("../models/error-model");

const getPosts = (req, res, next) => {
  console.log("get request route for Post's ");
  res.json({ message: "get route" });
};

const getPostById = (req, res, next) => {
  console.log("get request route for Post by id");
  const placeId = req.params.postid;
  if (!placeId) {
    throw HttpError("err message", 404);
  }

  //    other approach when working with async fns
  //    if (!placeId) {
  //     const error = new Error('err message');
  //     error.code = 404;
  //     next(error);
  //  }
  res.json({ message: placeId });
};

const createPost = (req, res, next) => {
  console.log("post request route for creating new post");
};

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;

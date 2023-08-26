const express = require("express");
// require returns a function call it and store in app const
const bodyParser = require("body-parser");
// ready to use middlewares to parse incoming req body
const mongoose = require("mongoose");

const fs = require("fs");
const path = require("path");
const userRoutes = require("./routes/users-routes");
const postsRoutes = require("./routes/posts-routes");

const app = express();

app.use(bodyParser.json());
// app.use('/uploads/images', express.static(path.join('uplouds', 'images')));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use((req, res, next) => {
  // for CORS errors
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postsRoutes);

app.use((req, res, next) => {
  const error = new HttpError("couldn't find route", 404);
  throw error;
});

// providing a 4 params middleware fn , by default treated as an error handling middleware

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({
    message: error.message || "An Unknown Error Happened",
  });
});
const DBurl =
  "mongodb+srv://kareem:highspeedlowdrag@cluster0.risomee.mongodb.net/karegram?retryWrites=true&w=majority";

mongoose
  .connect(DBurl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(" Server Connected to DB on localhost:5000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

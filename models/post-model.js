const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  caption: { type: String, required: true },
  image: { type: String, required: true },
  owner: { type: String },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

postSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Post", postSchema);

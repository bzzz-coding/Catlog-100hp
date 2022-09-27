const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  //   require: true,
  // },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdByName: {
    type: String,
    ref: "User",
  },
  cat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cat",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Log", LogSchema);

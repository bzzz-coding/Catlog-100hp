const mongoose = require("mongoose");

const CatSchema = new mongoose.Schema({
  catName: {
    type: String, 
    required: true, 
  },
  breed: String,
  birthday: {
    type: Date,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  fixed: {
    type: String,
    required: true,
  },
  vaxxed: {
    type: String,
    required: true,
  },
  personality: String,
  note: String,
  needsHomeBy: Date,
  urgent: String,
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});


module.exports = mongoose.model("Cat", CatSchema);

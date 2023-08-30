const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer, // Binary Data type for storing image data
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // Assuming you have a User schema
    ref: "User", // Replace with your User model name
    required: true,
  },
  publish: {
    type: Boolean,
    default: false,
  },
});

const DrawModel = mongoose.model("Draw", drawSchema);

module.exports = DrawModel;

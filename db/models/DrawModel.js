import mongoose from "mongoose";

const { Schema } = mongoose;

const drawSchema = new Schema({
  imageData: { type: String },
  title: { type: String },
  userId: { type: String },
  published: { type: Boolean },
});

const Draw = mongoose.models.Draw || mongoose.model("Draw", drawSchema);

export default Draw;

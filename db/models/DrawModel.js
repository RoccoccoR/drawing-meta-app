import mongoose from "mongoose";

const { Schema } = mongoose;

const drawSchema = new Schema({
  imageData: { type: String, required: true },
  title: { type: String, required: true },
  userId: { type: String, required: true },
});

const Draw = mongoose.models.Draw || mongoose.model("Draw", drawSchema);

export default Draw;

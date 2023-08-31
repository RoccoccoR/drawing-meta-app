import mongoose from "mongoose";

const { Schema } = mongoose;

const drawSchema = new Schema({
  title: { type: String, required: true },
  user: { type: String, required: true },
});

const Draw = mongoose.models.Draw || mongoose.model("Draw", drawSchema);

export default Draw;

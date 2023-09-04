import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: String, required: true },
  imageData: { type: String, required: true },
  id: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

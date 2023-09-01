import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  user: { type: String, required: true },
  image: { type: String, required: true },
  id: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    user_id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      // required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,  // Initially, the user is not verified
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;

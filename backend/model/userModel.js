import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600, partialFilterExpression: { isVerified: false } });

const User = mongoose.model("User", userSchema);
export default User;

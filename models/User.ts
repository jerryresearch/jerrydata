import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "password is required"],
      minLength: 6,
    },
    // emailVerified: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    // token: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);

import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // username: {
    //   type: String,
    //   required: [true, "username is required"],
    //   trim: true,
    //   unique: true,
    // },
    // firstName: {
    //   type: String,
    //   required: [true, "first name is required"],
    //   trim: true,
    // },
    // lastName: {
    //   type: String,
    //   required: [true, "last name is required"],
    //   trim: true,
    // },
    fullName: {
      type: String,
      // required: [true, "full name is required"],
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

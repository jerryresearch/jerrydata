import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: 6,
  },
});

export default mongoose.model("User", UserSchema);

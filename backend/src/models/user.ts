import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  designation: {
    type: String,
  },
  profilePicture: {
    type: String, // Store the image URL using cloudinary
  },

});

const User = mongoose.model("User", userSchema);
export default User;
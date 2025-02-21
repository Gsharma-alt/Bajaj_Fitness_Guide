import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/images/default-avatar.png'
  },
  profilePhoto: {
    type: String,
    default: '/images/default-profile-photo.png'
  }
}, {
  timestamps: true
});

const User=mongoose.model("User",userSchema)
export default User;
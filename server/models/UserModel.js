import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },

  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],

  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],

  role: {
    type: String,
    enum: ["jobseeker", "recruiter"],
    default: "jobseeker",
  },

  profession: {
    type: String,
    default: "Unemployed",
  },

  phone: {
    type: String,
  },

  location: {
    type: String,
  },

  linkedin: {
    type: String,
  },

  github: {
    type: String,
  },

  website: {
    type: String,
  },

  bio: {
    type: String,
    default: "No bio provided",
  },

  skills: [{
    type: String,
  }],

  education: [{
    degree: String,
    school: String,
    year: String,
  }],

  experience: [{
    title: String,
    company: String,
    duration: String,
    description: String,
  }],

  company: {
    type: String,
  },

  position: {
    type: String,
  },

  resume: {
    type: String,
  },

  profilePicture: {
    type: String,
  },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

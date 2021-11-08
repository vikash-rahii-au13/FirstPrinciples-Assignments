import mongoose from 'mongoose'
mongoose.set('debug', true);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },

  resetToken: {
    type: String,
    default: ''
  },
  expireToken: {
    type: String,
    default: ''
  },

  profileImage: {
    type: String,
    default: ""
  },
  status: { type: String, enum: ['Inactive', 'Active', 'Delete'], default: 'Active' },
  createdDate: {
    type: Date,
    default: Date.now
  },
  upatedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);

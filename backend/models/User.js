const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['patient', 'doctor', 'expert', 'admin'], 
    required: true 
  },
  phone: String,
  email: String,
  avatar: String,
  
  // Doctor/Expert fields
  specialty: String,
  room: String,
  
  // Patient fields
  dob: Date,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  bloodType: String,
  medicalHistory: [String]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

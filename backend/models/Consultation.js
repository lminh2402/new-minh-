const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  requestingDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expertDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicalRecordId: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalRecord' },
  message: String, 
  status: { type: String, enum: ['pending', 'replied', 'closed'], default: 'pending' },
  expertReply: String
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);

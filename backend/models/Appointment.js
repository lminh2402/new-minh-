const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  appointmentDate: { type: Date, required: true },
  timeSlot: { type: String, required: true }, 
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  symptomsDesc: String,
  aiTriageResult: { 
    riskLevel: String,
    suggestedSpecialty: String,
    confidence: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);

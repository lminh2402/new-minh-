const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // SOAP Format
  subjective: String,
  objective: String,  
  assessment: String, 
  plan: String,       
  
  labOrders: [String],
  prescriptions: [{    
    drugName: String,
    quantity: Number,
    dosage: String,
    route: String
  }],
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);

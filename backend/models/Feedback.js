const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  reporter: { type: String, required: true }, // e.g., 'Dr. Nguyen Minh' or 'Patient Report'
  reporterType: { type: String, enum: ['Doctor', 'Patient', 'Expert'], required: true },
  subject: { type: String, required: true },
  severity: { type: String, enum: ['high', 'medium', 'low'], required: true },
  
  // AI related context
  patientMessage: { type: String },
  aiMessage: { type: String },
  aiAssessment: { type: String }, // What AI initially decided
  
  // Doctor/Patient reported issue
  reportedIssue: { type: String, required: true },
  
  // Expert review
  status: { type: String, enum: ['pending', 'reviewed', 'ignored'], default: 'pending' },
  aiResultEvaluation: { type: String, enum: ['correct', 'incorrect', 'unreviewed'], default: 'unreviewed' },
  expertReply: { type: String },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);

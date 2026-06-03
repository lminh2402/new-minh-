const mongoose = require('mongoose');

const scenarioSchema = new mongoose.Schema({
  scenarioId: { type: String, required: true },
  title: { type: String, required: true }, // e.g., 'Viêm ruột thừa cấp'
  department: { type: String, required: true }, // e.g., 'Tiêu hóa'
  urgency: { type: String, enum: ['emergency', 'high', 'medium', 'low'], required: true },
  description: { type: String, default: '' }, // Short description / Symptoms
  
  redFlagsRules: { type: String, default: '' }, // e.g., "IF pain > 7 AND fever THEN..."
  aiScript: { type: String, default: '' }, // Instructions for AI
  
  lastUpdatedBy: { type: String, default: 'Chuyên gia' }, // e.g., 'Chuyên gia Minh'
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scenario', scenarioSchema);

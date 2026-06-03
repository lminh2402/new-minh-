const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  messageType: { type: String, enum: ['text', 'image', 'system'], default: 'text' },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);

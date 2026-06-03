const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single feedback by id
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (feedback == null) {
      return res.status(404).json({ message: 'Cannot find feedback' });
    }
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    caseId: req.body.caseId,
    reporter: req.body.reporter,
    reporterType: req.body.reporterType,
    subject: req.body.subject,
    severity: req.body.severity,
    patientMessage: req.body.patientMessage,
    aiMessage: req.body.aiMessage,
    aiAssessment: req.body.aiAssessment,
    reportedIssue: req.body.reportedIssue
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (Update) feedback (e.g. Expert reviewing)
router.patch('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (feedback == null) {
      return res.status(404).json({ message: 'Cannot find feedback' });
    }

    if (req.body.status != null) feedback.status = req.body.status;
    if (req.body.aiResultEvaluation != null) feedback.aiResultEvaluation = req.body.aiResultEvaluation;
    if (req.body.expertReply != null) feedback.expertReply = req.body.expertReply;
    
    feedback.updatedAt = Date.now();

    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

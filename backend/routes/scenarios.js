const express = require('express');
const router = express.Router();
const Scenario = require('../models/Scenario');

// GET all scenarios
router.get('/', async (req, res) => {
  try {
    const scenarios = await Scenario.find().sort({ updatedAt: -1 });
    res.json(scenarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single scenario
router.get('/:id', async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);
    if (scenario == null) {
      return res.status(404).json({ message: 'Cannot find scenario' });
    }
    res.json(scenario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new scenario
router.post('/', async (req, res) => {
  const scenario = new Scenario({
    scenarioId: req.body.scenarioId || `SCN-${Math.floor(1000 + Math.random() * 9000)}`,
    title: req.body.title,
    department: req.body.department,
    urgency: req.body.urgency,
    description: req.body.description,
    redFlagsRules: req.body.redFlagsRules,
    aiScript: req.body.aiScript,
    lastUpdatedBy: req.body.lastUpdatedBy || 'Chuyên gia'
  });

  try {
    const newScenario = await scenario.save();
    res.status(201).json(newScenario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (Update) scenario
router.patch('/:id', async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);
    if (scenario == null) {
      return res.status(404).json({ message: 'Cannot find scenario' });
    }

    if (req.body.title != null) scenario.title = req.body.title;
    if (req.body.department != null) scenario.department = req.body.department;
    if (req.body.urgency != null) scenario.urgency = req.body.urgency;
    if (req.body.description != null) scenario.description = req.body.description;
    if (req.body.redFlagsRules != null) scenario.redFlagsRules = req.body.redFlagsRules;
    if (req.body.aiScript != null) scenario.aiScript = req.body.aiScript;
    if (req.body.lastUpdatedBy != null) scenario.lastUpdatedBy = req.body.lastUpdatedBy;
    
    scenario.updatedAt = Date.now();

    const updatedScenario = await scenario.save();
    res.json(updatedScenario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE scenario
router.delete('/:id', async (req, res) => {
  try {
    const scenario = await Scenario.findById(req.params.id);
    if (scenario == null) {
      return res.status(404).json({ message: 'Cannot find scenario' });
    }
    await scenario.deleteOne();
    res.json({ message: 'Deleted Scenario' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

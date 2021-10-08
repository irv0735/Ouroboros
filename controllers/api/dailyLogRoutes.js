const router = require('express').Router();
const { Router } = require('express');
const { DailyLog } = require('../../models');

// Create a new daily-log entry for the active user
router.post('/', async (req, res) => {
  try {
    const dbDailyData = await DailyLog.create({
      date: req.body.entryDate,
      journal: req.body.journal,
      emotion: req.body.emotion, 
      user_id: req.session.user_id
    });
    const cleanDaily = dbDailyData.get({ plain: true});
    res.status(201).json(cleanDaily);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})



module.exports = router;
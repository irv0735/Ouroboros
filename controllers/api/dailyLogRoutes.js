const router = require('express').Router();
const { DailyLog } = require('../../models');

// Create a new daily-log entry for the active user
router.post('/', async (req, res) => {
  try {
    const dbDailyData = await DailyLog.create({
      date: req.body.entryDate,
      journal: req.body.journal, 
      user_id: req.session.user_id
    });
    res.status(200).json(dbDailyData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;
const router = require('express').Router();
const { ActivityLog } = require('../../models');

// Create a new activity-log entry for the active user
router.post('/', async (req, res) => {
  const newActivities = [];
  req.body.activityArray.forEach(element => {
    newActivities.push({
      user_id: req.session.user_id,
      date: req.body.entryDate,
      activity_id: element,
      daily_log_id: req.body.daily_log_id,
      public_allowed: req.body.publicFeed 
    });
  });
  try { 
    const activityLogData = await ActivityLog.bulkCreate(newActivities);
    res.status(201).json(activityLogData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Return specified number of most recent activities logged for all users
router.get('/:limit', async (req, res) => {
  try {
    const activityLogData = await ActivityLog.findAll({
      limit: req.params.count
    });
    const activityLog = activityLogData.get({ plain: true });
    res.status(200).json(activityLog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Unused 
// Return the total count for the selected activity for the current user
// router.get('/activity-count/:id', async (req, res) => {
//   try {
//     const activityCount = await ActivityLog.count({ 
//       where: { 
//         activity_id: req.params.id, 
//         user_id: req.session.user_id 
//         }
//     });
//     res.status(200).json(activityCount)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// })

module.exports = router;
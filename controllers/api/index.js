const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dailyLogRoutes = require('./dailyLogRoutes');
const activityLogRoutes = require('./activityLogRoutes');

router.use('/users', userRoutes);
router.use('/daily-log', dailyLogRoutes);
router.use('/activity-log', activityLogRoutes);

module.exports = router;

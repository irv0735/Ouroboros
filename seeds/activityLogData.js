const { ActivityLog } = require('../models');

const activityLogData = [
  {
    daily_log_id: 1,
    activity_id: 2,
    user_id: 1,
  },
  {
    daily_log_id: 1,
    activity_id: 4,
    user_id: 1,
  },
  {
    daily_log_id: 2,
    activity_id: 3,
    user_id: 2,
  },
  {
    daily_log_id: 3,
    activity_id: 1,
    user_id: 2,
  },
  {
    daily_log_id: 3,
    activity_id: 2,
    user_id: 2,
  },
  {
    daily_log_id: 3,
    activity_id: 4,
    user_id: 2,
  },
  {
    daily_log_id: 4,
    activity_id: 4,
    user_id: 2,
  },
  {
    daily_log_id: 5,
    activity_id: 4,
    user_id: 2,
  },
  {
    daily_log_id: 5,
    activity_id: 5,
    user_id: 3,
  },
  {
    daily_log_id: 5,
    activity_id: 6,
    user_id: 3,
  },
  {
    daily_log_id: 6,
    activity_id: 2,
    user_id: 3,
  },
];

const seedActivityLog = () => ActivityLog.bulkCreate(activityLogData);

module.exports = seedActivityLog;

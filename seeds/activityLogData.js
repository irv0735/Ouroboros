const { ActivityLog } = require('../models');

const activityLogData = [
  {
    daily_log_id: 1,
    date: 2021-09-30,
    activity_id: 2,
    user_id: 1,
    public_allowed: 1,
  },
  {
    daily_log_id: 1,
    date: 2021-09-30,
    activity_id: 4,
    user_id: 1,
    public_allowed: 1,
  },
  {
    daily_log_id: 2,
    date: 2021-10-01,
    activity_id: 3,
    user_id: 2,
    public_allowed: 1,
  },
  {
    daily_log_id: 3,
    date: 2021-09-30,
    activity_id: 1,
    user_id: 2,
    public_allowed: 0,
  },
  {
    daily_log_id: 3,
    date: 2021-09-30,
    activity_id: 2,
    user_id: 2,
    public_allowed: 1,
  },
  {
    daily_log_id: 3,
    date: 2021-09-30,
    activity_id: 4,
    user_id: 2,
    public_allowed: 0,
  },
  {
    daily_log_id: 4,
    date: 2021-10-01,
    activity_id: 4,
    user_id: 2,
    public_allowed: 1,
  },
  {
    daily_log_id: 5,
    date: 2021-09-30,
    activity_id: 4,
    user_id: 2,
    public_allowed: 0,
  },
  {
    daily_log_id: 5,
    date: 2021-09-30,
    activity_id: 5,
    user_id: 3,
    public_allowed: 0,
  },
  {
    daily_log_id: 5,
    date: 2021-09-30,
    activity_id: 6,
    user_id: 3,
    public_allowed: 0,
  },
  {
    daily_log_id: 6,
    date: 2021-10-01,
    activity_id: 2,
    user_id: 3,
    public_allowed: 1,
  },
];

const seedActivityLog = () => ActivityLog.bulkCreate(activityLogData);

module.exports = seedActivityLog;

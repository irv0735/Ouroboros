const { ActivityLog } = require('../models');

const activityLogData = [
  {
    user_id: 1,
    activity_id: 2,
  },
  {
    user_id: 1,
    activity_id: 4,
  },
  {
    user_id: 2,
    activity_id: 3,
  },
  {
    user_id: 2,
    activity_id: 1,
  },
  {
    user_id: 3,
    activity_id: 2,
  },
  {
    user_id: 3,
    activity_id: 4,
  },
];

const seedActivityLog = () => ActivityLog.bulkCreate(activityLogData);

module.exports = seedActivityLog;

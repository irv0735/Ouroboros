const User = require('./User');
const Activity = require('./Activity');
const DailyLog = require('./DailyLog');
const ActivityLog = require('./ActivityLog')
const UserSettings = require('./UserSettings');


User.hasOne(UserSettings, {
  foreignKey: 'user_id'
});

User.hasMany(DailyLog, {
  foreignKey: 'user_id'
});

DailyLog.hasMany(ActivityLog, {
  foreighKey: 'daily_log_id'
});

Activity.hasMany(ActivityLog, {
  foreighKey: 'activity_id'
});

User.belongsToMany(Activity, {
  through: {
    model: ActivityLog,
    unique: false
  },
  as: 'user_activities'
});

ActivityLog.belongsTo(Activity, {
  foreignKey: 'activity_id'
});

ActivityLog.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, UserSettings, Activity, ActivityLog, DailyLog };

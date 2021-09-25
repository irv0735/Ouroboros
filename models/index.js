const User = require('./User');
const Activity = require('./Activity');
const Badge = require('./Badge');
const DailyLog = require('./DailyLog');

User.hasMany(Activity, {
  foreignKey: 'user_id'
});

User.hasMany(DailyLog, {
  foreignKey: 'user_id'
});

module.exports = { User, Activity, Badge };

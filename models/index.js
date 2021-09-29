const User = require('./User');
const Activity = require('./Activity');
const DailyLog = require('./DailyLog');
const UserSettings = require('./UserSettings');

User.hasMany(DailyLog, {
  foreignKey: 'user_id'
});

User.hasOne(UserSettings, {
  foreignKey: 'user_id'
});

module.exports = { User, Activity };

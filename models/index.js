const User = require('./User');
const Friend = require('./Friend');
const Activity = require('./Activity');
const DailyLog = require('./DailyLog');
const ActivityLog = require('./ActivityLog');
const Comment = require('./Comment');
const UserSettings = require('./UserSettings');


User.hasOne(UserSettings, {
  foreignKey: 'user_id'
});

User.hasMany(DailyLog, {
  foreignKey: 'user_id'
});

User.belongsToMany(User, {
  through: Friend, as: 'userFriends', 
  foreighKey: 'friend_id'
});

Friend.belongsTo(User, {
  as: 'userFriend', onDelete: 'CASCADE'
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

ActivityLog.hasMany(Comment, {
  foreign_key: 'activityLog_id',
  onDelete: 'CASCADE'
});

ActivityLog.belongsTo(Activity, {
  foreignKey: 'activity_id'
});

ActivityLog.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(ActivityLog, {
  foreignKey: 'activityLog_id'
})

Comment.belongsTo(User, {
  foreignKey: 'commentor_id'
});

module.exports = { User, UserSettings, Friend, Activity, ActivityLog, Comment, DailyLog };

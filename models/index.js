const User = require('./User');
const Activity = require('./Activity');
const Badge = require('./Badge');

User.hasMany(Activity, {
  foreignKey: 'user_id'
});

module.exports = { User, Activity, Badge };

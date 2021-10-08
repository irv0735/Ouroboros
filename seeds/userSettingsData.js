const { UserSettings } = require('../models');

const userSettingsData = [
  {
    bio: 'tall dude',
    goals: 'Learn to debug my mistakes more quickly',
    user_id: 3
  },
  {
    bio: 'professional badge developer',
    goals: 'keep the loose cannons in the group on track',
    user_id: 2
  }
];

const seedUserSettings = () => UserSettings.bulkCreate(userSettingsData);

module.exports = seedUserSettings;

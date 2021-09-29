const { UserSettings } = require('../models');

const userSettingsData = [
  {
    bio: 'Fumbling along with a lack of direction',
    goals: 'Beat depression',
    user_id: 3
  }
];

const seedUserSettings = () => UserSettings.bulkCreate(userSettingsData);

module.exports = seedUserSettings;

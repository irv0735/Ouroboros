const sequelize = require('../config/connection');
const seedActivity = require('./activityData');
const seedDailyLog = require('./dailyLogData');
const seedActivityLog = require('./activityLogData');
const seedUsers = require('./userData');
const seedUserSettings = require('./userSettingsData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedUserSettings();
  await seedActivity();
  await seedDailyLog();
  await seedActivityLog();

  process.exit(0);
};

seedAll();

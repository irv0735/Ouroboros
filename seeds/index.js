const sequelize = require('../config/connection');
const seedActivity = require('./activityData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedActivity();


  process.exit(0);
};

seedAll();

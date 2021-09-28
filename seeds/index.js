const sequelize = require('../config/connection');
const seedGallery = require('./activityData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();


  process.exit(0);
};

seedAll();

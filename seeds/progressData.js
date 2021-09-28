const { Progress } = require('../models');

const progressData = [
  {
    type: 'meditation',
    points: 10,
    starting_date: 'June 22, 2021 09:00:00',
    user_id: 3
  },
  
];

const seedUser = () => Progress.bulkCreate(progressData);

module.exports = seedUser;
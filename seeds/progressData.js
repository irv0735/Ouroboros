const { Progress } = require('../models');

const progressData = [
  {
    type: 'meditation',
    points: 10,
    user_id: 3
  },
  
];

const seedUser = () => Progress.bulkCreate(progressData);

module.exports = seedUser;
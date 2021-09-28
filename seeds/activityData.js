const { Activity } = require('../models');

const userData = [
  {
    name: 'meditation',
    description: 'quite time to think and shit',
    points: 10,
    user_id: 1
    
  },
  
];

const seedUser = () => Activity.bulkCreate(userData);

module.exports = seedUser;

const { Activity } = require('../models');

const userData = [
  {
    type: 'meditation',
    name: 'Johnny Appleseed',
    points: 10,
    starting_date: 'June 22, 2021 09:00:00',
    ending_date: null,
  },
  
];

const seedUser = () => Activity.bulkCreate(userData);

module.exports = seedUser;

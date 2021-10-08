const { User } = require('../models');

const userData = [
  {
    id: 1,
    first_name: 'Micheal',
    last_name: 'Limones',
    display_name: 'ZestyLimones',
    email: 'michlimones@gmail.com',
    password: 'secret123'
  },
  {
    id: 2,
    first_name: 'Jillian',
    last_name: 'FitzMaurice',
    display_name: 'ShyFidelity',
    email: 'info@jilliankayworks.com',
    password: 'secret123'
  },
  {
    id: 3,
    first_name: 'Nate',
    last_name: 'Irvin',
    display_name: 'irv0735',
    email: 'irv0735@gmail.com',
    password: 'secret123'
  }
];

const seedUsers = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUsers;

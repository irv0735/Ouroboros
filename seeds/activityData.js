const { Activity } = require('../models');

const activityData = [
  {
    name: 'Meditation',
    description: 'quiet time to think and shit',
    points: 10,
    badge_name: 'meditation'
  },
  {
    name: 'Run/Walk',
    description: 'physical movement in a specific direction',
    points: 10,
    badge_name: 'movement'
  },
  {
    name: 'Phone a Friend',
    description: 'Call a loved one to catch up',
    points: 10,
    badge_name: 'phoneafriend' 
  },
  {
    name: 'Yoga',
    description: 'act like a pretzel',
    points: 10,
    badge_name: 'yoga'
  },
  {
    name: 'Creative',
    description: 'get your head into the clouds',
    points: 10,
    badge_name: 'creative'
  },
  {
    name: 'Sleep',
    description: 'get 8 hours plz',
    points: 10,
    badge_name: 'sleep'
  },

  {
    name: 'Sunshine',
    description: 'get outside you pale ass lizard person',
    points: 10,
    badge_name: 'sunshine'
  },
  {
    name: 'Nutrition',
    description: 'eat a salad you big fat fattie',
    points: 10,
    badge_name: 'nutrition'
  },

  {
    name: 'CBT',
    description: 'cognitive behavioral therapy',
    points: 10,
    badge_name: 'cbt'
  }];

const seedActivity = () => Activity.bulkCreate(activityData);

module.exports = seedActivity;

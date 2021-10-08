const { DailyLog } = require('../models');

const dailyLogData = [
  {
    id: 1,
    journal: 'The goal of supercharged waveforms is to plant the seeds of complexity rather than materialism.',
    emotion: 'joy',
    user_id: 1,
  },
  {
    id: 2,
    journal: 'The multiverse is buzzing with supercharged waveforms.',
    emotion: 'fear',
    user_id: 1,
  },
  {
    id: 3,
    journal: 'Freedom is the driver of growth.',
    emotion: 'anger',
    user_id: 2,
  },
  {
    id: 4,
    journal: 'The goal of superpositions of possibilities is to plant the seeds of curiosity rather than selfishness.',
    emotion: 'worry',
    user_id: 2,
  },
  {
    id: 5,
    journal: 'Consciousness consists of chaos-driven reactions of quantum energy. “Quantum” means an unveiling of the Vedic.',
    emotion: 'surprise',
    user_id: 3,
  },
  {
    id: 6,
    journal: 'By unveiling, we live.',
    emotion: 'sadness',
    user_id: 3,
  },
];

const seedDailyLog = () => DailyLog.bulkCreate(dailyLogData);

module.exports = seedDailyLog;

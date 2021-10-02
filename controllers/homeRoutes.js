const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, UserSettings, Activity, ActivityLog, DailyLog } = require('../models');
const withAuth = require('../utils/auth');

// Renders the homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders the Login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Renders the Dashboard for the current session user
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Activity, through: ActivityLog, as: 'user_activities', 
                  attributes: ['id', 'name', 'points', 'badge_requires', 'badge_name' ]},
                { model: UserSettings, attributes: ['bio'] }]
    })
    const userClean = userData.get({ plain: true });
    if (!userClean.user_activities[0]) {
      res.render('dashboard', { ...userClean, logged_in: true });
    } else {
      const getPercentage = new Promise((resolve, reject) => {
        userClean.user_activities.forEach( async (element) => {
          const activityCount = await ActivityLog.count({ 
            where: { 
              activity_id: element.id, 
              user_id: req.session.user_id 
              }
          });
          const userPercentage = (((activityCount*element.points)/(element.badge_requires))*100);
          element.userPercent = userPercentage;
          resolve();
        });
      }).then(() => {
      res.render('dashboard', { ...userClean, logged_in: true })});
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Renders the new-account form page
router.get('/account-creation', (req, res) => {
  if (!req.session.logged_in) {
    try {
      res.render('create_account');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.redirect('/dashboard');
  }
});

// Renders the account-settings form page for the session user
router.get('/account-settings', withAuth, async (req, res) => {
  try {
    const userSettings = await UserSettings.findOne({
      where: {user_id: req.session.user_id}, 
      attributes: ['bio', 'goals'] } );
    if (userSettings) {
      const cleanSettings = userSettings.get({ plain: true });
      res.render('account_settings', {...cleanSettings, logged_in: true, existing_data: true })
    }
    else {
      res.render('account_settings', { logged_in: true, existing_data: false })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Renders the Daily Log page for the session user
router.get('/daily-log', withAuth, async (req, res) => {
  try {
    const activityData = await Activity.findAll({
      attributes: ['id', 'name'],
    });
    const activities = activityData.map((activity) => activity.get({ plain: true }));
    
    const dailyData = await DailyLog.findAll({
      where: {user_id: req.session.user_id},
      attributes: ['date', 'journal', 'emotion'] 
    })
    const dailyHistory = dailyData.map((log) => log.get({ plain: true }));
    if (dailyHistory) {
      const getActivities = new Promise((resolve, reject) => {
        dailyHistory.forEach(async (element) => {
          const activityLogData = await ActivityLog.findAll({
            where: {user_id: req.session.user_id,
                    date: element.date},
            include: [{model: Activity, attributes: ['name']}],
            })
          element.activities = activityLogData;
          resolve();
        });
      }).then(() => {
        console.log(activities, dailyHistory);
        res.render('daily_log', {
          activities,
          dailyHistory,
          logged_in: true,
        });
      })
    } else {
      res.render('daily_log', {
        activities,
        dailyHistory,
        logged_in: true,
      })
    }
    // const activityLogData = await ActivityLog.findAll({
    //   where: {user_id: req.session.user_id,},
    //   include: [{model: Activity, attributes: ['name']}],
    //   })
    // const activityHistory = activityLogData.map((activity) => activity.get({ plain: true }));
    // console.log(activities, dailyHistory);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

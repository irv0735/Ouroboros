const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, UserSettings, Activity, ActivityLog, DailyLog, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Renders the homepage
router.get('/', async (req, res) => {
  try {
    const activityLog = await ActivityLog.findAll({
      where: {public_allowed: 1},
      attributes: ['id', 'date', 'liked'],
      order: [['date', 'DESC']],
      include: [{ model: User, attributes: ['display_name']},
                { model: Activity, attributes: ['name']},
                { model: Comment}],
      limit: 15
    })
    const cleanActivities = activityLog.map((log) => log.get({ plain: true}));
    res.render('homepage', { activities: cleanActivities , logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
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
                  attributes: ['id', 'name', 'badge_name' ]},
                { model: UserSettings, attributes: ['bio', 'goals', 'profile_pic'] }]
    })
    const userClean = userData.get({ plain: true });
    res.render('dashboard', { ...userClean, logged_in: true })
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
      order: [['date', 'DESC']],
      attributes: ['date', 'journal', 'emotion'], 
      include: [{model: ActivityLog, attributes: ['activity_id'], 
                include: [{model: Activity, attributes: ['name']}]}] 
    })
    const dailyHistory = dailyData.map((log) => log.get({ plain: true }));

    res.render('daily_log', {
      activities,
      dailyHistory,
      logged_in: true,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

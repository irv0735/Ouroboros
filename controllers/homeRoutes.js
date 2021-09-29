const router = require('express').Router();
const { User, Activity } = require('../models');
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
    });
    const userClean = userData.get({ plain: true });
    res.render('dashboard', { ...userClean, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders the new-account form page
router.get('/account_creation', (req, res) => {
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
router.get('/account_details', withAuth, (req, res) => {
  try {
    res.render('account_details', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders the Daily Log form for the session user
router.get('/daily_log', withAuth, async (req, res) => {
  try {
    const activityData = await Activity.findAll({
      attributes: ['id', 'name'],
    });
    const activities = activityData.map((activity) =>
      activity.get({ plain: true })
    );
    res.render('daily_log', {
      activities,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

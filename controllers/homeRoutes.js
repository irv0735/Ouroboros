const router = require('express').Router();
const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
  res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/dashboard', (req, res) => {
  if (req.session.logged_in) {
    try {
      res.render('dashboard');
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else {
    res.redirect('/login');
  }
});

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

module.exports = router;

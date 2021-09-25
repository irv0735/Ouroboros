const router = require('express').Router();
const { User } = require('../../models');
const DailyLog = require('../../models/DailyLog');

router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      display_name: req.body.displayName,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.logged_In = true;
      console.log(dbUserData);
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/daily-log', async (req, res) => {
  console.log("journal entry request received")
  try {
    const dbDailyData = await DailyLog.create({
      date: req.body.entryDate,
      journal: req.body.journal, 
      user_id: req.session.user_id
    });
    res.status(200).json(dbDailyData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

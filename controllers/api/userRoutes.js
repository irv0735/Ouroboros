const router = require('express').Router();
const { User, UserSettings } = require('../../models');

// Create a new user in the database
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
      req.session.logged_in = true;
      req.session.user_id = dbUserData.dataValues.id;
      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete account from the database
router.delete('/', async (req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.session.user_id
      },
    });
    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with that ID'});
    }
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create the account settings for the active user
router.post('/settings', async (req, res) => {
  try {
    const dbUserSettings = await UserSettings.create({
      bio: req.body.bio, 
      goals: req.body.goals,
      user_id: req.session.user_id
    });
    res.status(200).json(dbUserSettings);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Update the account settings for the active user
router.put('/settings', async (req, res) => {
  UserSettings.update(req.body, {where: {user_id: req.session.user_id}} )
  .then((updatedSettings) => res.json(updatedSettings))
  .catch((err) => res.status(500).json(err))
})

// Login route to validate email/password and initiate the session
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

// Logout route to destroy the session
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

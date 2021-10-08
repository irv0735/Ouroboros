const router = require('express').Router();
const { User, UserSettings } = require('../../models');
const multer = require('multer');
const storage = multer.memoryStorage();
const Jimp = require('jimp');
const upload = multer({ storage: storage });
const AWS = require('aws-sdk');



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
      res.status(201).json(dbUserData);
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
router.post('/settings', upload.single("file"), async (req, res) => {
  let settings = req.body;
  const image = req.file;
  const userId = req.session.user_id;
  const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;
  const file = await Jimp.read(Buffer.from(image.buffer, 'base64'))
      .then(async image => {
        image.resize(Jimp.AUTO, 900);
        return image.getBufferAsync(Jimp.AUTO);
      })
      .catch(err => {
        res.status(500).json({ msg: 'Server Error', error: err });
      });
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4'
  });
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: image.originalname,
    Body: file,
    ContentType: image.mimetype,
    ACL: 'public-read'
  };
  s3bucket.upload(params, async (err, data) => {
    try {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
        const newFileUploaded = {
           fileLink: s3FileURL + image.originalname,
           s3_key: params.Key
        };
        settings = { ...settings, profile_pic: newFileUploaded.fileLink, user_id: userId };
        const newSettings = await UserSettings.create(settings);
        res.send(newSettings);
      }
    } catch (err) {
     res.status(500).json({ msg: 'Server Error', error: err });
    }
  });
})

// Update the account settings for the active user
router.put('/settings', upload.single("file"), async (req, res) => {
  let settings = req.body;
  const image = req.file;
  const userId = req.session.user_id;
  const s3FileURL = process.env.AWS_UPLOADED_FILE_URL_LINK;
  const file = await Jimp.read(Buffer.from(image.buffer, 'base64'))
      .then(async image => {
        image.resize(Jimp.AUTO, 900);
        return image.getBufferAsync(Jimp.AUTO);
      })
      .catch(err => {
        res.status(500).json({ msg: 'Server Error', error: err });
      });
  let s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4'
  });
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: image.originalname,
    Body: file,
    ContentType: image.mimetype,
    ACL: 'public-read'
  };
  s3bucket.upload(params, async (err, data) => {
    try {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
        const newFileUploaded = {
           fileLink: s3FileURL + image.originalname,
           s3_key: params.Key
        };
        settings = { ...settings, profile_pic: newFileUploaded.fileLink };
        const newSettings = await UserSettings.update(settings, {where: {user_id: userId}})
        res.send(newSettings);
      }
    } catch (err) {
     res.status(500).json({ msg: 'Server Error', error: err });
    }
  });
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

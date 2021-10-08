const router = require('express').Router();
const { User, UserSettings } = require('../../models');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const AWS = require('aws-sdk');
const Jimp = require('jimp');


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
  try {
    const dbUserSettings = await UserSettings.create({
      bio: req.body.bio, 
      goals: req.body.goals,
      user_id: req.session.user_id
    });
    res.status(201).json(dbUserSettings);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Update the account settings for the active user
router.put('/settings', upload.single("file"), (req, res) => {

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


//not using this or intend to 
//incorprating it all in /settings 
//combining all into the one response object 
//rO contains bio goals file and gets sent to /settings
//do everything with those three items within the /settings 

router.post('/photos', upload.single('file'), async (req, res) => {
  let info = req.body;

  try {
    const image = req.file;

    const file = await Jimp.read(Buffer.from(image.buffer, 'base64'))
      .then(async image => {
        const background = await Jimp.read('https://url/background.png');
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

        image.resize(Jimp.AUTO, 900);
        image.composite(background, 1000, 700);
        image.print(font, 1000, 700, 'Logo');
        return image.getBufferAsync(Jimp.AUTO);
      })
      .catch(err => {
        res.status(500).json({ msg: 'Server Error', error: err });
      });


    const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

    let s3bucket = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    //Where you want to store your file

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.session.user_id,
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
            description: req.body.description,
            fileLink: s3FileURL + req.session.user_id,
            s3_key: params.Key
          };
          info = { ...info, photo: newFileUploaded.fileLink };
          // Add all info to database after store picture to S3
          const photos = await database.addPhoto(db, info);
          res.send(photos);
        }
      } catch (err) {
        res.status(500).json({ msg: 'Server Error', error: err });
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err });
  }
});

module.exports = router;

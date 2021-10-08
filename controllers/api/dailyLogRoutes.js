const router = require('express').Router();
const { DailyLog } = require('../../models');

// Create a new daily-log entry for the active user
router.post('/', async (req, res) => {
  let newEmotion = "undetected";
  let newFeelingInput = req.body.journal.replaceAll(" ", "%20");
  let feelingAPI = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=" + newFeelingInput
  const getEmotion = new Promise((resolve, reject) => {
    fetch(feelingAPI, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": process.env.TWINXRAPIDKEY,
      "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com"
    }
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      if (data.emotions_detected[0]) {
        newEmotion = data.emotions_detected[0];
      }
      resolve();
      return;
    })
    .catch(err => {
      console.error(err);
    });
  });
  
  try {
    const dbDailyData = await DailyLog.create({
      date: req.body.entryDate,
      journal: req.body.journal,
      emotion: emotion, 
      user_id: req.session.user_id
    });
    const cleanDaily = dbDailyData.get({ plain: true});
    res.status(201).json(cleanDaily);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})


module.exports = router;
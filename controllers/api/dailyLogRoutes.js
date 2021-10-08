const router = require('express').Router();
const { Router } = require('express');
const { DailyLog } = require('../../models');
const axios = require('axios');

// Create a new daily-log entry for the active user
router.post('/', async (req, res) => {
  let newEmotion = "undetected";
  let phrase = req.body.journal;
  const newFeelingInput = phrase.replace(/ /g, "%20");
  let feelingAPI = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/?text=" + newFeelingInput
  const options = {
    'method': 'GET',
    'url': feelingAPI,
    'headers': {
      "x-rapidapi-key": process.env.TWINXRAPIDKEY,
      "x-rapidapi-host": "twinword-emotion-analysis-v1.p.rapidapi.com"
    }
  }
  const result = await axios(options)
  if (result.data.emotions_detected[0]) {
        newEmotion = result.data.emotions_detected[0];
      }
  try {
    const dbDailyData = await DailyLog.create({
      date: req.body.entryDate,
      journal: req.body.journal,
      emotion: newEmotion, 
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
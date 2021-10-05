const { Activity } = require("../../models");
const router = require("express").Router();


router.get('/unicorns', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const allActivities = await Activity.findAll({
     
            attributes: ['name'],
          
        
      });
  
      // Serialize data so the template can read it
      const activities = allActivities.map((activity) => activity.get({ plain: true }));
      res.status(200).json(activities)
    } catch (err) {
      res.status(500).json(err);
    }
  });
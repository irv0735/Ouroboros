const { Activity } = require("../../models");
const router = require("../homeRoutes");
const { get } = require("../homeRoutes");

router.get('/unicorns', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const allActivities = await Activity.findAll({
        include: [
          {
            model: Activity,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const activities = allActivities.map((activity) => activity.get({ plain: true }));
 
    } catch (err) {
      res.status(500).json(err);
    }
  });
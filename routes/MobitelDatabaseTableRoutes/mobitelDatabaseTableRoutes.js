const router = require("express").Router();
const Posts = require("../../models/mobitelProjectsDatabase");

// ------------------------ Getting site data to Databases ---------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/mobitelProjectsDatabasesSiteData', async (req, res) => {
    // console.log(req.query.Project);
    const Site_Engineer = req.query.Site_Engineer;
    const Project = req.query.Project;

    let reqQuery = [];
    if ( !req.query.Project && !req.query.Site_Engineer) {
        reqQuery = {};
    } else if (req.query.Project && req.query.Project === 'All Mobitel Projects' && !req.query.Site_Engineer) {
        reqQuery = {};
    } else if (req.query.Project && req.query.Project !== 'All Mobitel Projects' && !req.query.Site_Engineer) {
        reqQuery = { Project };
    } else if (req.query.Site_Engineer && req.query.Site_Engineer === 'All Site Engineers' && !req.query.Project) {
        reqQuery = {};
    } else if (req.query.Site_Engineer && req.query.Site_Engineer !== 'All Site Engineers' && !req.query.Project) {
        reqQuery = { Site_Engineer };
    } else if (req.query.Project === 'All Mobitel Projects' && req.query.Site_Engineer === 'All Site Engineers') {
        reqQuery = {};
    } else if (req.query.Project === 'All Mobitel Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
        reqQuery = { Site_Engineer };
    } else if (req.query.Site_Engineer === 'All Site Engineers' && req.query.Project !== 'All Mobitel Projects') {
        reqQuery = { Project };
    } else if (req.query.Project !== 'All Mobitel Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
        reqQuery = { ...req.query };
    }
    // console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);
    // console.log(queryStr);

  Posts.find(JSON.parse(queryStr)).exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    return res.status(200).json({
      success: true,
      posts:posts,
    });
  });
});

module.exports = router;

const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------ Getting site data to vendor project Databases ---------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesSiteData', async (req, res) => {
  // console.log(req.query.Project);
  const Site_Engineer = req.query.Site_Engineer;
  const Project = req.query.Project;

  let reqQuery = [];
  if (!req.query.Project && !req.query.Site_Engineer) {
    reqQuery = {};
  } else if (req.query.Project && req.query.Project === 'All Vendor Projects' && !req.query.Site_Engineer) {
    reqQuery = {};
  } else if (req.query.Project && req.query.Project !== 'All Vendor Projects' && !req.query.Site_Engineer) {
    reqQuery = { Project };
  } else if (req.query.Site_Engineer && req.query.Site_Engineer === 'All Site Engineers' && !req.query.Project) {
    reqQuery = {};
  } else if (req.query.Site_Engineer && req.query.Site_Engineer !== 'All Site Engineers' && !req.query.Project) {
    reqQuery = { Site_Engineer };
  } else if (req.query.Project === 'All Vendor Projects' && req.query.Site_Engineer === 'All Site Engineers') {
    reqQuery = {};
  } else if (req.query.Project === 'All Vendor Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
    reqQuery = { Site_Engineer };
  } else if (req.query.Site_Engineer === 'All Site Engineers' && req.query.Project !== 'All Vendor Projects') {
    reqQuery = { Project };
  } else if (req.query.Project !== 'All Vendor Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
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
      posts: posts,
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------ Getting Huawei site data to Huawei project Databases ---------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesSiteData/Huawei', async (req, res) => {
  // console.log(req.query.Project);
  const Site_Engineer = req.query.Site_Engineer;
  const Project = req.query.Project;
  const Implementation_By = req.query.Implementation_By;

  let reqQuery = [];
  if (!req.query.Project && !req.query.Site_Engineer) {
    reqQuery = { Implementation_By };
  } else if (req.query.Project && req.query.Project === 'All Huawei Projects' && !req.query.Site_Engineer) {
    reqQuery = { Implementation_By };
  } else if (req.query.Project && req.query.Project !== 'All Huawei Projects' && !req.query.Site_Engineer) {
    reqQuery = { Implementation_By, Project };
  } else if (req.query.Site_Engineer && req.query.Site_Engineer === 'All Site Engineers' && !req.query.Project) {
    reqQuery = { Implementation_By };
  } else if (req.query.Site_Engineer && req.query.Site_Engineer !== 'All Site Engineers' && !req.query.Project) {
    reqQuery = { Implementation_By, Site_Engineer };
  } else if (req.query.Project === 'All Huawei Projects' && req.query.Site_Engineer === 'All Site Engineers') {
    reqQuery = { Implementation_By };
  } else if (req.query.Project === 'All Huawei Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
    reqQuery = { Implementation_By, Site_Engineer };
  } else if (req.query.Site_Engineer === 'All Site Engineers' && req.query.Project !== 'All Huawei Projects') {
    reqQuery = { Implementation_By, Project };
  } else if (req.query.Project !== 'All Huawei Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
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
      posts: posts,
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------ Getting ZTE site data to ZTE project Databases ---------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/vendorProjectsDatabasesSiteData/ZTE', async (req, res) => {
  // console.log(req.query.Project);
  const Site_Engineer = req.query.Site_Engineer;
  const Project = req.query.Project;
  const Implementation_By = req.query.Implementation_By;

  let reqQuery = [];
  if (!req.query.Project && !req.query.Site_Engineer) {
    reqQuery = { Implementation_By };
  } else if (req.query.Project && req.query.Project === 'All ZTE Projects' && !req.query.Site_Engineer) {
    reqQuery = { Implementation_By };
  } else if (req.query.Project && req.query.Project !== 'All ZTE Projects' && !req.query.Site_Engineer) {
    reqQuery = { Implementation_By, Project };
  } else if (req.query.Site_Engineer && req.query.Site_Engineer === 'All Site Engineers' && !req.query.Project) {
    reqQuery = { Implementation_By };
  } else if (req.query.Site_Engineer && req.query.Site_Engineer !== 'All Site Engineers' && !req.query.Project) {
    reqQuery = { Implementation_By, Site_Engineer };
  } else if (req.query.Project === 'All ZTE Projects' && req.query.Site_Engineer === 'All Site Engineers') {
    reqQuery = { Implementation_By };
  } else if (req.query.Project === 'All ZTE Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
    reqQuery = { Implementation_By, Site_Engineer };
  } else if (req.query.Site_Engineer === 'All Site Engineers' && req.query.Project !== 'All ZTE Projects') {
    reqQuery = { Implementation_By, Project };
  } else if (req.query.Project !== 'All ZTE Projects' && req.query.Site_Engineer !== 'All Site Engineers') {
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
      posts: posts,
    });
  });
});

module.exports = router;

const router = require("express").Router();
const Posts = require("../../models/mobitelProjectsDatabase");


//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get sites data to the graphs  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProjectsLastUpdates', async (req, res, next) => {
    // console.log(req.query.Project);

    let reqQuery = [];
    if (req.query.Project === 'All Mobitel Projects') {
        reqQuery = {};
    } else {
        reqQuery = { ...req.query };
    }

    // console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);
    // console.log(queryStr);

    Posts.find((JSON.parse(queryStr)), {}, { sort: { 'updatedAt' : -1 } }).limit(5).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });
});


//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get Latest updates for the Site Engineers Analytics  ----------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProjectsLastUpdates/siteEngineers', async (req, res, next) => {
    const Site_Engineer = req.query.Site_Engineer;

    let reqQuery = [];
    if (req.query.Project === 'All Mobitel Projects') {
      reqQuery = { Site_Engineer };
    } else {
      reqQuery = { ...req.query };
    }

    // console.log(reqQuery);

    let queryStr = JSON.stringify(reqQuery);
    console.log(queryStr);

    Posts.find((JSON.parse(queryStr)), {}, { sort: { 'updatedAt' : -1 } }).limit(5).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get Latest updates for Sub Projects  ----------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProjectsLastUpdates/SubProjects', async (req, res, next) => {
    const SpecialTag = req.query.Special_Tag;
    const Project = req.query.Project;
    // { Special_Tag: { $in: ["text", "here"] }}
    // console.log(req.query.Special_Tag);
  
    let reqQuery = [];
    if (req.query.Project === 'All Projects' && req.query.Special_Tag !== 'All Sub Projects') {
      reqQuery = { "Special_Tag": { $in: SpecialTag } };
    } else if (req.query.Project === 'All Projects' && req.query.Special_Tag === 'All Sub Projects') {
      reqQuery = { };
    } else if (req.query.Project === 'Vendor Projects' && req.query.Special_Tag !== 'All Sub Projects') {
      reqQuery = { Project };
    } else if (req.query.Project === 'Vendor Projects' && req.query.Special_Tag === 'All Sub Projects') {
      reqQuery = { Project };
    } else if (req.query.Project === 'Mobitel Projects' && req.query.Special_Tag !== 'All Sub Projects') {
      reqQuery = { "Special_Tag": { $in: SpecialTag } };
    } else if (req.query.Project === 'Mobitel Projects' && req.query.Special_Tag === 'All Sub Projects') {
      reqQuery = { };
    }
    
    // console.log(reqQuery);
  
    let queryStr = JSON.stringify(reqQuery);
    // console.log(queryStr);

    Posts.find((JSON.parse(queryStr)), {}, { sort: { 'updatedAt' : -1 } }).limit(5).exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });
});

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;
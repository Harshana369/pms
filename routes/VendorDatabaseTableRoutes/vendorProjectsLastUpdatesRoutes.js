const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get sites data to the Latest updates of All vendor projects Insights ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/vendorProjectsLastUpdates", async (req, res, next) => {
  // console.log(req.query.Project);

  let reqQuery = [];
  if (req.query.Project === "All Vendor Projects") {
    reqQuery = {};
  } else {
    reqQuery = { ...req.query };
  }

  // console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr), {}, { sort: { updatedAt: -1 } })
    .limit(5)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get sites data to the Latest updates of Huawei Insights ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/vendorProjectsLastUpdates/Huawei", async (req, res, next) => {
  const Implementation_By = req.query.Implementation_By;
  const Project = req.query.Project;
  // console.log(req.query.Project);

  let reqQuery = [];
  if (req.query.Project === "All Huawei Projects") {
    reqQuery = { Implementation_By };
  } else {
    reqQuery = { Implementation_By, Project };
  }

  // console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);
  console.log(queryStr);

  Posts.find(JSON.parse(queryStr), {}, { sort: { updatedAt: -1 } })
    .limit(5)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get sites data to the Latest updates of ZTE Insights ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/vendorProjectsLastUpdates/ZTE", async (req, res, next) => {
  const Implementation_By = req.query.Implementation_By;
  const Project = req.query.Project;
  // console.log(req.query.Project);

  let reqQuery = [];
  if (req.query.Project === "All ZTE Projects") {
    reqQuery = { Implementation_By };
  } else {
    reqQuery = { Implementation_By, Project };
  }

  // console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr), {}, { sort: { updatedAt: -1 } })
    .limit(5)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    });
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------- Get Latest updates for Sub Projects  ----------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/vendorProjectsLastUpdates/SubProjects", async (req, res, next) => {
  const SpecialTag = req.query.Special_Tag;
  const Project = req.query.Project;
  // { Special_Tag: { $in: ["text", "here"] }}
  // console.log(req.query.Special_Tag);

  let reqQuery = [];
  if (
    req.query.Project === "All Projects" &&
    req.query.Special_Tag !== "All Sub Projects"
  ) {
    reqQuery = { Special_Tag: { $in: SpecialTag } };
  } else if (
    req.query.Project === "All Projects" &&
    req.query.Special_Tag === "All Sub Projects"
  ) {
    reqQuery = {};
  } else if (
    req.query.Project === "Vendor Projects" &&
    req.query.Special_Tag !== "All Sub Projects"
  ) {
    reqQuery = { Project };
  } else if (
    req.query.Project === "Vendor Projects" &&
    req.query.Special_Tag === "All Sub Projects"
  ) {
    reqQuery = { Project };
  } else if (
    req.query.Project === "Mobitel Projects" &&
    req.query.Special_Tag !== "All Sub Projects"
  ) {
    reqQuery = { Special_Tag: { $in: SpecialTag } };
  } else if (
    req.query.Project === "Mobitel Projects" &&
    req.query.Special_Tag === "All Sub Projects"
  ) {
    reqQuery = {};
  }

  // console.log(reqQuery);

  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr), {}, { sort: { updatedAt: -1 } })
    .limit(5)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    });
});

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = router;

const router = require("express").Router();
const Posts = require("../models/vendorProjectsOverviewTable");

router.post("/vendorProjectsOverviewTable/save", (req, res) => {
  let newPost = new Posts(req.body);

  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Project Details Added Successfully",
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -----------------------  Get posts from Vendor Projects Overview Table  --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get("/vendorProjectsOverviewTable", (req, res) => {
  // console.log(req.query);

  let reqQuery = [];
  if (req.query.ProjectName === "All Vendor Projects") {
    reqQuery = {};
  } else if (req.query.ProjectName === "All Huawei Projects") {
    reqQuery = { Vendor: "Huawei" };
  } else if (req.query.ProjectName === "All ZTE Projects") {
    reqQuery = { Vendor: "ZTE" };
  } else {
    reqQuery = { ...req.query };
  }

  // console.log(reqQuery);
  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr)).exec((err, vendorProjects) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPosts: vendorProjects,
      scopeDataToTheFrontEnd: getProjectScopeData(vendorProjects),
      vendorProjectsNamesArrayToTheExcelUploads:
        getProjectsNamesArrayToExcelUploads(vendorProjects),
    });
  });
});

// Get a specific post

router.route("/vendorProjectsOverviewTable/:id").get(async (req, res) => {
  let postId = req.params.id;

  await Posts.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------
// --------------------------  Get projects name array  -------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------

router.get("/vendorProjectsOverviewTableProjectsArray", (req, res) => {
  // console.log(req.query);

  let reqQuery = [];
  if (req.query.Project === "All Vendor Projects" || !req.query.Project) {
    reqQuery = {};
  } else {
    reqQuery = { ...req.query };
  }

  // console.log(reqQuery);
  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr)).exec((err, vendorProjects) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      vendorProjectsNamesArray: getProjectsNamesArray(vendorProjects),
      vendorProjectsNamesArrayForInsights:
        getProjectsNamesArrayInsights(vendorProjects),
      vendorProjectsNamesArrayToTheExcelUploads:
        getProjectsNamesArrayToExcelUploads(vendorProjects),
      AllvendorProjectsArrayToEditForms:
        getProjectsNamesArrayForEditForms(vendorProjects),
    });
  });
});

// ------------------------------------------------------------------------------------------------------------------
// --------------------------  Get Filtered projects name array by Vendor Project  ----------------------------------
// ------------------------------------------------------------------------------------------------------------------

router.get("/filteredVendorProjectsNamesArray", (req, res) => {
  // console.log(req.query);

  let reqQuery = [];
  if (req.query.Project === "All Vendor Projects") {
    reqQuery = {};
  } else {
    reqQuery = { ...req.query };
  }

  // console.log(reqQuery);
  let queryStr = JSON.stringify(reqQuery);
  // console.log(queryStr);

  Posts.find(JSON.parse(queryStr)).exec((err, vendorProjects) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      filteredProjectNamesArray:
        getFilteredProjectNamesArrayInsights(vendorProjects),
      filteredZTEProjectNamesArray:
        getFilteredProjectNamesArrayZTEInsights(vendorProjects),
    });
  });
});

// -------------------------------------------------------------------------------------------------------------------
// ---- update posts -------------------------------------------------------------------------------------------------

router.route("/vendorProjectsOverviewTable/Edit/:id").put(async (req, res) => {
  let postID = req.params.id;
  const {
    ProjectName,
    Vendor,
    StartDate,
    EndDate,
    Budget,
    ProjectScope,
    HandoverScope,
    OnHoldSites,
    PATPass,
    Completed,
    Remaining,
    Progress,
  } = req.body;
  const updatePost = {
    ProjectName,
    Vendor,
    StartDate,
    EndDate,
    Budget,
    ProjectScope,
    HandoverScope,
    OnHoldSites,
    PATPass,
    Completed,
    Remaining,
    Progress,
  };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
    .then(() => {
      res.status(200).send({ status: "Project Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Update Error", error: err.message });
    });
});

//  delete post -----------------------------------------------------------------------------------------------

router
  .route("/vendorProjectsOverviewTable/delete/:id")
  .delete(async (req, res) => {
    let postID = req.params.id;
    await Posts.findByIdAndDelete(postID)
      .then(() => {
        res.status(200).send({ status: "Project Data Deleted" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          status: "Error occured while deleting Preject details",
          error: err.message,
        });
      });
  });

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectScopeData(vendorProjects) {
  var scopeDataArray = [];

  projectsScopesLength = vendorProjects.filter(
    (obj) => obj.ProjectScope
  ).length;

  for (var i = 0; i < projectsScopesLength; i++) {
    scopeDataArray[i] = vendorProjects.filter((obj) => obj.ProjectScope)[
      i
    ].ProjectScope;
  }

  let scopeDataSum = 0;

  for (let i = 0; i < scopeDataArray.length; i++) {
    scopeDataSum += scopeDataArray[i];
  }

  // console.log(scopeDataSum);
  return scopeDataSum;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsNamesArray(vendorProjects) {
  var projectsNames = [];
  var projectsNamesArray = [];

  projectsNamesLength = vendorProjects.filter((obj) => obj.ProjectName).length;

  for (var i = 0; i < projectsNamesLength; i++) {
    projectsNames[i] = vendorProjects.filter((obj) => obj.ProjectName)[
      i
    ].ProjectName;

    projectsNamesArray.push({
      value: projectsNames[i],
      label: projectsNames[i],
    });
  }

  //  console.log(projectsNamesArray);
  return projectsNamesArray;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------------- Get filtered project names by All vendor projects  -------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getProjectsNamesArrayInsights(vendorProjects) {
  var projectsNames = [];
  var projectsNamesArray = [
    { value: "All Vendor Projects", label: "All Vendor Projects" },
  ];

  projectsNamesLength = vendorProjects.filter((obj) => obj.ProjectName).length;

  for (var i = 0; i < projectsNamesLength; i++) {
    projectsNames[i] = vendorProjects.filter((obj) => obj.ProjectName)[
      i
    ].ProjectName;

    projectsNamesArray.push({
      value: projectsNames[i],
      label: projectsNames[i],
    });
  }

  return projectsNamesArray;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------------- Get project names by All vendor projects For Edit Forms Select Menu  -------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getProjectsNamesArrayForEditForms(vendorProjects) {
  var projectsNames = [];
  var projectsNamesArray = [];

  projectsNamesLength = vendorProjects.filter((obj) => obj.ProjectName).length;

  for (var i = 0; i < projectsNamesLength; i++) {
    projectsNames[i] = vendorProjects.filter((obj) => obj.ProjectName)[
      i
    ].ProjectName;

    projectsNamesArray.push({
      value: projectsNames[i],
      label: projectsNames[i],
    });
  }

  // console.log(projectsNamesArray);
  return projectsNamesArray;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------------------- Get filtered project names by Huawei projects  -----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getFilteredProjectNamesArrayInsights(vendorProjects) {
  var projectsNames = [];
  var projectsNamesArray = [
    { value: "All Huawei Projects", label: "All Huawei Projects" },
  ];

  projectsNamesLength = vendorProjects.filter((obj) => obj.ProjectName).length;

  for (var i = 0; i < projectsNamesLength; i++) {
    projectsNames[i] = vendorProjects.filter((obj) => obj.ProjectName)[
      i
    ].ProjectName;

    projectsNamesArray.push({
      value: projectsNames[i],
      label: projectsNames[i],
    });
  }
  // console.log(projectsNamesArray);
  return projectsNamesArray;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------------------- Get filtered project names by ZTE projects  -----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
function getFilteredProjectNamesArrayZTEInsights(vendorProjects) {
  var projectsNames = [];
  var projectsNamesArray = [
    { value: "All ZTE Projects", label: "All ZTE Projects" },
  ];

  projectsNamesLength = vendorProjects.filter((obj) => obj.ProjectName).length;

  for (var i = 0; i < projectsNamesLength; i++) {
    projectsNames[i] = vendorProjects.filter((obj) => obj.ProjectName)[
      i
    ].ProjectName;

    projectsNamesArray.push({
      value: projectsNames[i],
      label: projectsNames[i],
    });
  }
  // console.log(projectsNamesArray);
  return projectsNamesArray;
}

//---------------------------------------------------------------------------------------------------------------------------
//------------------------------  Get projects names array to the Excell uploading page.  ----------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectsNamesArrayToExcelUploads(vendorProjects) {
  var projectsNames = [];
  var projectsNamesArray = [];

  projectsNamesLength = vendorProjects.filter((obj) => obj.ProjectName).length;

  for (var i = 0; i < projectsNamesLength; i++) {
    projectsNames[i] = vendorProjects.filter((obj) => obj.ProjectName)[
      i
    ].ProjectName;

    projectsNamesArray.push(projectsNames[i]);
  }

  // console.log(projectsNamesArray);
  return projectsNamesArray;
}

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

module.exports = router;

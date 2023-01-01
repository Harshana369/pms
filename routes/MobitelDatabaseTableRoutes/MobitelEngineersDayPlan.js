const router = require("express").Router();

const Posts = require("../../models/mobitelProjectsDatabase");
const DayPlan = require("../../models/mobitelSiteEngineerDayPlan");
// ------------------------------------------01--------------------------------------------------------------------------
// -----------------------  Get Site Engineers Name --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get("/getAllSiteEngineersName", (req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      allSiteEngineersNames: getAllSiteEngineersName(posts),
    });
  });
});
// -----------------------------
function getAllSiteEngineersName(posts) {
  const duplicateSiteEngineersArray = posts.map(({ Site_Engineer }) => ({
    Site_Engineer,
  }));

  const siteEngineersNames = duplicateSiteEngineersArray.filter(
    (value, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.Site_Engineer !== null && t.Site_Engineer === value.Site_Engineer
      )
  );
  //console.log(siteEngineersNames);
  return siteEngineersNames;
}

// -----------------------------------------02---------------------------------------------------------------------------
// -----------------------  Get Site Engineer for Site Id Data --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.route("/getSiteEngineerForSiteData/:id").get(async (req, res) => {
  await Posts.find().exec((err, posts) => {
    let postId = req.params.id;
    // console.log(postId);
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json(getSite(posts, postId));
  });
});

//------------------------

function getSite(posts, postId) {
  var siteArray = posts.filter(function (el) {
    return el.Site_Engineer === postId;
  });

  const reformattedArray = siteArray.map(({ Site_ID }) => ({
    Site_ID,
  }));

  const filteredArray = reformattedArray.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.Site_ID === value.Site_ID)
  );

  // console.log(filteredArray);
  return filteredArray;
}

// -----------------------------------------03---------------------------------------------------------------------------
// --------------------------------  Get All site Data --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get("/getAllSiteData", (req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      allSiteData: posts,
    });
  });
});

//-----------------------------------04---------------------------------------------------------------------------
// ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/siteEngineerDayPlan/save", (req, res) => {
  // console.log(req.body);
  const temp = {
    SiteEngineer: req.body.siteEName.Site_Engineer,
    planDate: req.body.planDate,
    sName: req.body.selectedId,
    selectedScope: req.body.selectedScope,
    plannedWork: req.body.plannedWork,
  };

  let newPost = new DayPlan(temp);
  newPost.save((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "DayPlan Details Added Successfully",
    });
  });
});

// -----------------------------------------05---------------------------------------------------------------------------
// ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/getSiteEngineerForTable", (req, res) => {
  DayPlan.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json(posts);
  });
});

// -----------------------------------------06---------------------------------------------------------------------------
// ------------------------- Site Engineer For Table Loading  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.route("/getSiteEngineerForTableLoad/:id").get(async (req, res) => {
  await DayPlan.find().exec((err, posts) => {
    let postId = req.params.id;

    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    var uniqueTableArray = posts.filter(function (el) {
      return el.SiteEngineer === postId;
    });

    // console.log(uniqueTableArray);
    return res.status(200).json(uniqueTableArray);
  });
});

// -----------------------------------------07---------------------------------------------------------------------------
// ------------------------- Site Engineer For Update Table  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.route("/SiteEngineerDayPlan/Edit").put(async (req, res) => {
  let postID = req.body._id;
  const { Site_Status, Result_Date, Comment } = req.body;

  const updatePost = {
    Site_Status,
    Result_Date,
    Comment,
  };
  await DayPlan.findByIdAndUpdate(postID, updatePost)
    .then(() => {
      res.status(200).send({ status: "DayPlan Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Update Error", error: err.message });
    });
});

// -----------------------------------------07---------------------------------------------------------------------------
// ------------------------- Mobitel Database Site Status Update  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.route("/mobitelDatabase/Scope/Edit").put(async (req, res) => {
  await Posts.find().exec(async (err, posts) => {
    const SiteID = req.body.sName;
    const Site_Status = req.body.Site_Status;
    const Commisioned_Date = req.body.Result_Date;
    const myScope = req.body.selectedScope;

    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    var uniqueScope = posts.filter(function (el) {
      return el.Site_ID === SiteID && el.Scope === myScope;
    });

    let ProjectID = uniqueScope.map(function (element) {
      return element.Project_ID;
    });

    const Projectid = ProjectID[0];
    // console.log(Projectid);

    await Posts.findOneAndUpdate(
      { Project_ID: `${Projectid}` },
      { Site_Status: `${Site_Status}`, Commisioned_Date: `${Commisioned_Date}` }
    )

      .then(() => {
        res
          .status(200)
          .send({ status: "Mobitel database Site_Status Updated" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Update Error", error: err.message });
      });
  });
});

module.exports = router;

// //   const Data = reformattedArray.map((object) => object.Site_ID);
// //let filteredArray = [...new Set(reformattedArray)];
// //console.log(filteredArray);
// //   return filteredArray;

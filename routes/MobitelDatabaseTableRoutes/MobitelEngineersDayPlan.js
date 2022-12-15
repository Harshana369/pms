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
      allSiteData: posts,
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

    return res.status(200).json({
      success: true,
      Site: getSite(posts, postId),
    });
  });
});

//------------------------

function getSite(posts, postId) {
  var siteArray = posts.filter(function (el) {
    return el.Site_Engineer === postId;
  });

  const reformattedArray = siteArray.map(({ Site_ID, _id }) => ({
    Site_ID,
    _id,
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

// --------------------------------------------------------------------------------------------------------------------
// -----------------------  Get Site_Id of Site Engineers DayPlan from MobitelDatabase --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

// router.get("/allSiteID", (req, res) => {
//   Posts.find().exec((err, posts) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       AllSite: getAllSiteId(posts),
//     });
//   });
// });

// --------------------------------------------------------------------------------------------------------------------
// -----------------------  Get Site_Id for Scope Data --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

// router.route("/getScopeData/:id").get(async (req, res) => {
//   //   let postId = "62e90ff2092ec9454c92a0c0";

//   await Posts.find().exec((err, posts) => {
//     let postId = req.params.id;

//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       AllScopeObj: getAllScopeObj(posts, postId),
//     });
//   });
// });

// // router("/getScopeData/:id").get(async (req, res) => {
// //   let postId = req.params.id;
// //   console.log(postId);
// //   await Posts.findById(postId, (err, post) => {
// //     if (err) {
// //       return res.status(400).json({ success: false, err });
// //     }
// //     return res.status(200).json({
// //       success: true,
// //       post,
// //     });
// //   });
// // });

// function getAllSiteId(posts) {
//   const reformattedArray = posts.map(({ Site_ID, _id, Scope }) => ({
//     Site_ID,
//     _id,
//     Scope,
//   }));
//   const filteredArray = reformattedArray.filter(
//     (value, index, self) =>
//       index === self.findIndex((t) => t.Site_ID === value.Site_ID)
//   );
//   //   console.log(filteredArray);
//   return filteredArray;
// }

// // ----------------------------

// function getAllScopeObj(posts, postId) {
//   var newArray = posts.filter(function (el) {
//     return el.Site_ID === postId;
//   });
//   //console.log(newArray);
//   return newArray;
// }

// -----------------------------------------04---------------------------------------------------------------------------
// ------------------------- Posting sites data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/siteEngineerDayPlan/save", (req, res) => {
  const temp = {
    SiteEngineer: req.body.siteEName.Site_Engineer,
    planDate: req.body.planDate,
    sName: req.body.sName,
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
    return res.status(200).json({
      success: true,
      siteEngineerForTable: posts,
    });
  });
});

module.exports = router;

// //   const Data = reformattedArray.map((object) => object.Site_ID);
// //let filteredArray = [...new Set(reformattedArray)];
// //console.log(filteredArray);
// //   return filteredArray;

const router = require("express").Router();
const Posts = require("../models/MaterialDatabase");

// ------------------------- Posting items data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/materialProjectsDatabases/save/:id", async (req, res) => {
  const objID = req.params.id;

  const artist = await Posts.updateOne(
    {
      _id: objID,
    },
    {
      $push: {
        properties: {
          id: req.body.id,
          ERP_Description: req.body.ERP_Description,
          Category: req.body.Category,
        },
      },
    }
  );

  if (artist) {
    res.status(200).send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

// router.post("/materialProjectsDatabases/save", (req, res) => {
//   console.log("ok");
//   let newPost = new Posts(req.body);

//   newPost.save((err) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       success: "Project Details Added Successfully",
//     });
//   });
// });

// ------------------------- Get items data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get("/materialProjectsDatabases/getall", async (req, res, next) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: posts,
    });
  });
});

// ------------------------- update items data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.put("/materialProjectsDatabases/update/:id", async (req, res, next) => {
  const artist = await Posts.updateOne(
    {
      "properties._id": req.body._id,
    },

    {
      $set: {
        "properties.$.id": req.body.id,
        "properties.$.ERP_Description": req.body.ERP_Description,
        "properties.$.Category": req.body.Category,
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

// ------------------------- Delete items data to the database  ---------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.put("/materialProjectsDatabases/delete/:id", async (req, res, next) => {
  const objid = req.params.id;
  const rowid = req.body[0];
  const artist = await Posts.updateOne(
    {
      _id: objid,
    },
    {
      $pull: {
        properties: { _id: rowid },
      },
    }
  );

  if (artist) {
    res.send("Successful");
  } else {
    res.status(500).send("Not successful");
  }
});

module.exports = router;

const router = require("express").Router();
let Posts = require("../../models/columnShowHide/mobitelDatabase");

router.route("/Edit").put(async (req, res) => {
  id = "63515e4afda7eb47137b1089";
  // id = "638586da6e0dd10807fa086f";
  Posts.findByIdAndUpdate(id, req.body)
    .then((Posts) => res.json(Posts))
    .catch((err) => res.status(422).json(err));
});

router.get("/", async function (req, res) {
  id = "63515e4afda7eb47137b1089";
  //id = "638586da6e0dd10807fa086f";
  Posts.findById(id)
    .then((Posts) => res.send(Posts))
    .catch((err) => res.status(422).json(err));
});

// router.post("/Add", (req, res) => {
//   console.log("oko");
//   let newPost = new Posts(req.body);

//   newPost.save((err, posts) => {
//     if (err) {
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     return res.status(200).json({
//       //   success: "Project Details Added Successfully",
//       success: posts,
//     });
//   });
// });

module.exports = router;

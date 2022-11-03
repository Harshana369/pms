const router = require("express").Router();
const Posts = require("../../models/vendorProjectsDatabase");


//------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------- Posting Excell data to the database  --------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/vendorProjectsDatabasesExcell/upload', (req, res) => {
  const newPost = req.body;
  const user = 'userName';
  // console.log(newPost.length);

  async function run() {
    try {
      const options = { ordered: true };
      const operators = { $set: { currentUser: user } };
      const result = await Posts.insertMany(newPost, options);
      return res.status(200).json({
        success: `${newPost.length} Projects Added Successfully!`,
      });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({
          error:"Planning ID must be a unique value !"
        });
      } else {
        return res.status(400).json({
          error:err
        });
      }
    }
  }
  run();

});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports = router;

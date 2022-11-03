const router = require("express").Router();
const Posts = require("../../models/User");

// ------------------------ Getting User Profile ---------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/userProfile', async (req, res, next) => {
  // console.log(req.query.email);

  let reqQuery = { email : req.query.email };

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
      existingPosts:posts
    });
  });
});


// ------------------------ Getting Users List ---------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/users', async (req, res) => {
  Posts.find().exec((err, posts) => {
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

// ------------------ Update user data  ---------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------------

router.route('/users/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;
  const { 
    username,
    lastName,
    designation,
    adminLevel,
    email,
    contactNumber
  } = req.body;

  const updatePost = {
    username,
    lastName,
    designation,
    adminLevel,
    email,
    contactNumber
  }

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"User details updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// ---------------- Delete user data  ---------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------------

router.route('/users/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;
  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "User data deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting User details", error: err.message});
  })
});

//---------------------------------------------------------------------------------------------------------------------------

module.exports = router;

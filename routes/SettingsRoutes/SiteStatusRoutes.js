const router = require("express").Router();
const Posts = require("../../models/SiteStatusArrays");


// --------------------------------------------------------------------------------------------------------------------
// ----------------------------------------  Save SiteStatus from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.post('/SiteStatus/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Site Status Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Get SiteStatus  ------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/SiteStatus',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingPosts:posts,
      SiteStatusArray: getSiteStatusArray(posts),
      SiteStatusesArrayForSelectMenus: getSiteStatusArrayToTheSelectMenu(posts)
    });
  });
});

// Get a specific post

router.route("/SiteStatus/:id").get(async(req,res) =>{

  let postId = req.params.id;

  await Posts.findById(postId,(err,post) =>{
    if(err){
      return res.status(400).json({success:false, err});
    }    
      return res.status(200).json({
        success:true,
        post
      });
  });
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- update SiteStatus -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/SiteStatus/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { Site_Status } = req.body;
  const updatePost = { Site_Status };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Site Status Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete SiteStatus -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/SiteStatus/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Site Status Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Site Status", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get SiteStatus as an array  to the datagrids ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function getSiteStatusArray(posts) {

  var SiteStatus = [];

  for (var i= 0; i < posts.length; i++) {
    SiteStatus[i] = posts[i].Site_Status;
  }

  // console.log(SiteStatus);
  return SiteStatus;
};

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get SiteStatus as an array to the select menus ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function getSiteStatusArrayToTheSelectMenu(posts) {

  var SiteStatus = [];
  var SiteStatusArray = [];

  for (var i = 0; i < posts.length; i++) {
    SiteStatus[i] = posts[i].Site_Status;

    SiteStatusArray.push({
      value: SiteStatus[i],
      label: SiteStatus[i]
    });
  }

  // console.log(SiteStatusArray);
  return SiteStatusArray;
};

module.exports = router;
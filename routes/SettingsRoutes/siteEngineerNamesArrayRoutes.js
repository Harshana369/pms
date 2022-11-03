const router = require("express").Router();
const Posts = require("../../models/siteEngineersNamesList");


// --------------------------------------------------------------------------------------------------------------------
// -----------------------  Save Names of Site Engineers from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------


router.post('/siteEngineersNamesList/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Site Engineer Name Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -----------------------  Get posts from Vendor Projects Overview Table  --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/siteEngineersNamesList',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingNames:posts,
      siteEngineersNamesArray: getSiteEngineerNamesArray(posts),
    });
  });
});

// Get a specific post

router.route("/siteEngineersNamesList/:id").get(async(req,res) =>{

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
// ---------------------------------------------- update names -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/siteEngineersNamesList/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { Name } = req.body;
  const updatePost = { Name };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Site Engineer Details Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete Names -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/siteEngineersNamesList/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Site Engineer Name Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Site Engineer Name", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Site Engineers names as an array ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------


function getSiteEngineerNamesArray(posts) {

  var siteEngineers = [];

  for (var i= 0; i < posts.length; i++) {
    siteEngineers[i] = posts[i].Name;
  }

  // console.log(siteEngineers);
  return siteEngineers;
};

module.exports = router;
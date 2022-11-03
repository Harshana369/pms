const router = require("express").Router();
const Posts = require("../../models/SpecialTag");


// --------------------------------------------------------------------------------------------------------------------
// ----------------------------------------  Save special Tag from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.post('/specialTag/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Special Tag Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Get Special_Tag  ------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/specialTag',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingTags:posts,
      specialTagArray: getSpecialTagArray(posts),
      specialTaArrayForSelectMenus: getSpecialTagArrayToTheSelectMenu(posts)
    });
  });
});

// Get a specific post

router.route("/specialTag/:id").get(async(req,res) =>{

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
// ---------------------------------------------- update Special_Tag -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/specialTag/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { Special_Tag } = req.body;
  const updatePost = { Special_Tag };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Special Tag Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete Special_Tag -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/specialTag/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Special Tag Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Special Tag", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Special_Tag as an array  to the datagrids ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function getSpecialTagArray(posts) {

  var specialTag = [];

  for (var i= 0; i < posts.length; i++) {
    specialTag[i] = posts[i].Special_Tag;
  }

  // console.log(specialTag);
  return specialTag;
};

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Special_Tag as an array to the select menus ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function getSpecialTagArrayToTheSelectMenu(posts) {

  var specialTag = [];
  var specialTagArray = [];

  for (var i = 0; i < posts.length; i++) {
    specialTag[i] = posts[i].Special_Tag;

    specialTagArray.push({
      value: specialTag[i],
      label: specialTag[i]
    });
  }

  // console.log(specialTagArray);
  return specialTagArray;
};

module.exports = router;
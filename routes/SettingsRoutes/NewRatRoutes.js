const router = require("express").Router();
const Posts = require("../../models/NewRATArray");


// --------------------------------------------------------------------------------------------------------------------
// ----------------------------------------  Save New_RAT from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.post('/New_RAT/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"New RAT Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Get New_RAT  ------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/New_RAT',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingPosts:posts,
      New_RATArray: getNew_RATArray(posts),
      New_RATArrayForSelectMenus: getNew_RATArrayToTheSelectMenu(posts)
    });
  });
});

// Get a specific post

router.route("/New_RAT/:id").get(async(req,res) =>{

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
// ---------------------------------------------- update New_RAT -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/New_RAT/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { New_RAT } = req.body;
  const updatePost = { New_RAT };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"New RAT Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete New_RAT -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/New_RAT/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "New RAT Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting New_RAT", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get New_RAT as an array  to the datagrids ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function getNew_RATArray(posts) {

  var NewRAT = [];

  for (var i= 0; i < posts.length; i++) {
    NewRAT[i] = posts[i].New_RAT;
  }

  // console.log(New_RAT);
  return NewRAT;
};

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get New_RAT as an array to the select menus ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function getNew_RATArrayToTheSelectMenu(posts) {

  var NewRAT = [];
  var New_RATArray = [];

  for (var i = 0; i < posts.length; i++) {
    NewRAT[i] = posts[i].New_RAT;

    New_RATArray.push({
      value: NewRAT[i],
      label: NewRAT[i]
    });
  }

  // console.log(New_RATArray);
  return New_RATArray;
};

module.exports = router;
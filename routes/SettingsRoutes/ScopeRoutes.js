const router = require("express").Router();
const Posts = require("../../models/ScopeArray");


// --------------------------------------------------------------------------------------------------------------------
// ----------------------------------------  Save Scope from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.post('/Scope/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Scope Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Get Scope  ------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/Scope',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingPosts:posts,
      ScopeArray: getScopeArray(posts),
      ScopeArrayForSelectMenus: getScopeArrayToTheSelectMenu(posts)
    });
  });
});

// Get a specific post

router.route("/Scope/:id").get(async(req,res) =>{

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
// ---------------------------------------------- update Scope -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/Scope/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { Scope } = req.body;
  const updatePost = { Scope };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Scope Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete Scope -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/Scope/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Scope Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Scope", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Scope as an array  to the datagrids ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function getScopeArray(posts) {

  var ScopeArray = [];

  for (var i= 0; i < posts.length; i++) {
    ScopeArray[i] = posts[i].Scope;
  }

  // console.log(Scope);
  return ScopeArray;
};

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Scope as an array to the select menus ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function getScopeArrayToTheSelectMenu(posts) {

  var Scopes = [];
  var ScopeArray = [];

  for (var i = 0; i < posts.length; i++) {
    Scopes[i] = posts[i].Scope;

    ScopeArray.push({
      value: Scopes[i],
      label: Scopes[i]
    });
  }

  // console.log(ScopeArray);
  return ScopeArray;
};

module.exports = router;
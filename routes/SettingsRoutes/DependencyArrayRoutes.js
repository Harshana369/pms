const router = require("express").Router();
const Posts = require("../../models/DependencyArrays");


// --------------------------------------------------------------------------------------------------------------------
// ----------------------------------------  Save Dependency from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.post('/Dependency/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Dependency Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Get Dependency  ------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/Dependency',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingPosts:posts,
      DependencyArray: getDependencyArray(posts),
      DependencyArrayForSelectMenus: getDependencyArrayToTheSelectMenu(posts)
    });
  });
});

// Get a specific post

router.route("/Dependency/:id").get(async(req,res) =>{

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
// ---------------------------------------------- update Dependency -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/Dependency/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { Dependency } = req.body;
  const updatePost = { Dependency };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Dependency Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete Dependency -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/Dependency/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Dependency Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Dependency", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Dependency as an array  to the datagrids ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function getDependencyArray(posts) {

  var Dependency = [];

  for (var i= 0; i < posts.length; i++) {
    Dependency[i] = posts[i].Dependency;
  }

  // console.log(Dependency);
  return Dependency;
};

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Dependency as an array to the select menus ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function getDependencyArrayToTheSelectMenu(posts) {

  var Dependency = [];
  var DependencyArray = [];

  for (var i = 0; i < posts.length; i++) {
    Dependency[i] = posts[i].Dependency;

    DependencyArray.push({
      value: Dependency[i],
      label: Dependency[i]
    });
  }

  // console.log(DependencyArray);
  return DependencyArray;
};

module.exports = router;
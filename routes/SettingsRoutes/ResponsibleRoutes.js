const router = require("express").Router();
const Posts = require("../../models/ResponsibleArrays");


// --------------------------------------------------------------------------------------------------------------------
// ----------------------------------------  Save Responsible from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.post('/Responsible/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Responsible Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Get Responsible  ------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/Responsible',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingPosts:posts,
      ResponsibleArray: getResponsibleArray(posts),
      ResponsibleArrayForSelectMenus: getResponsibleArrayToTheSelectMenu(posts)
    });
  });
});

// Get a specific post

router.route("/Responsible/:id").get(async(req,res) =>{

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
// ---------------------------------------------- update Responsible -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/Responsible/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { Responsible } = req.body;
  const updatePost = { Responsible };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Responsible Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete Responsible -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/Responsible/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Responsible Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Responsible", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Responsible as an array  to the datagrids ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function getResponsibleArray(posts) {

  var Responsible = [];

  for (var i= 0; i < posts.length; i++) {
    Responsible[i] = posts[i].Responsible;
  }

  // console.log(Responsible);
  return Responsible;
};

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Responsible as an array to the select menus ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function getResponsibleArrayToTheSelectMenu(posts) {

  var Responsible = [];
  var ResponsibleArray = [];

  for (var i = 0; i < posts.length; i++) {
    Responsible[i] = posts[i].Responsible;

    ResponsibleArray.push({
      value: Responsible[i],
      label: Responsible[i]
    });
  }

  // console.log(ResponsibleArray);
  return ResponsibleArray;
};

module.exports = router;
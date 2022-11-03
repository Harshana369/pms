const router = require("express").Router();
const Posts = require("../../models/SubContractorArray");


// --------------------------------------------------------------------------------------------------------------------
// ----------------------------------------  Save Sub_Contractor from settings --------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.post('/Sub_Contractor/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Sub Contractor Added Successfully"
    });
  });
});

// --------------------------------------------------------------------------------------------------------------------
// -------------------------------------  Get Sub_Contractor  ------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------

router.get('/Sub_Contractor',(req,res) =>{
  
  Posts.find().exec((err, posts) => {
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      existingPosts:posts,
      Sub_ContractorArray: getSub_ContractorArray(posts),
      Sub_ContractorArrayForSelectMenus: getSub_ContractorArrayToTheSelectMenu(posts)
    });
  });
});

// Get a specific post

router.route("/Sub_Contractor/:id").get(async(req,res) =>{

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
// ---------------------------------------------- update Sub_Contractor -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------


router.route('/Sub_Contractor/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;

  const { Sub_Contractor } = req.body;
  const updatePost = { Sub_Contractor };

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Sub Contractor Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------- Delete Sub_Contractor -------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------

router.route('/Sub_Contractor/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;

  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Sub Contractor Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Sub Contractor", error: err.message});
  })
});

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Sub_Contractor as an array  to the datagrids ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------

function getSub_ContractorArray(posts) {

  var SubContractor = [];

  for (var i= 0; i < posts.length; i++) {
    SubContractor[i] = posts[i].Sub_Contractor;
  }

  // console.log(Sub_Contractor);
  return SubContractor;
};

// -------------------------------------------------------------------------------------------------------------------
// -------------------------- Function to get Sub_Contractor as an array to the select menus ---------------------------------------
// -------------------------------------------------------------------------------------------------------------------
function getSub_ContractorArrayToTheSelectMenu(posts) {

  var SubContractor = [];
  var Sub_ContractorArray = [];

  for (var i = 0; i < posts.length; i++) {
    SubContractor[i] = posts[i].Sub_Contractor;

    Sub_ContractorArray.push({
      value: SubContractor[i],
      label: SubContractor[i]
    });
  }

  // console.log(Sub_ContractorArray);
  return Sub_ContractorArray;
};

module.exports = router;
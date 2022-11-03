const router = require("express").Router();
const Posts = require("../models/mobitelProjectsOverviewTable");

router.post('/mobitelProjectsOverviewTable/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Project Details Added Successfully"
    });
  });
});

//get posts


router.get('/mobitelProjectsOverviewTable', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }

    return res.status(200).json({
      success: true,
      existingPosts:posts,
      ScopeDataToTheFrontend:getProjectScopeData(posts),
    });
  });
});

// Get a specific post

router.route("/mobitelProjectsOverviewTable/:id").get(async(req,res) =>{

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

// ---- update posts ------------------------------------------------------------------------------------------

router.route('/mobitelProjectsOverviewTable/Edit/:id').put(async(req,res) =>{

  let postID = req.params.id;
  const { Database, ProjectName, Vendor, StartDate, EndDate, Budget, ProjectScope, HandoverScope, OnHoldSites, PATPass, Completed, Remaining, Progress} = req.body;
  const updatePost = {
    Database, ProjectName, Vendor, StartDate, EndDate, Budget, ProjectScope, HandoverScope, OnHoldSites, PATPass, Completed, Remaining, Progress
  }

  const update = await Posts.findByIdAndUpdate(postID, updatePost)
  .then(() => {
    res.status(200).send({status:"Project Details Updated"})
  }).catch ((err) => {
    console.log(err);
    res.status(500).send({status:"Update Error", error: err.message});
  })
});

//delete post -----------------------------------------------------------------------------------------------

router.route('/mobitelProjectsOverviewTable/delete/:id').delete(async(req,res) =>{
  let postID = req.params.id;
  await Posts.findByIdAndDelete(postID)
  .then(() => {
    res.status(200).send({status: "Project Data Deleted"});
  }).catch((err) => {
    console.log(err);
    res.status(500).send({status: "Error occured while deleting Preject details", error: err.message});
  })
});
// ------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

let projectName = 'All Projects';

async function changeProject(){
  projectName = 'All Projects';
  console.log(projectName);
}

async function changeProject1(){
  projectName = 'Other Project';
  console.log(projectName);
}

async function changeProject2() {
  projectName='Covid P3';
  console.log(projectName);
}

async function changeProject3() {
  projectName='Huawei IBBE P1';
  console.log(projectName);
}

async function changeProject4() {
  projectName='ZTE BBE 2020';
  console.log(projectName);
}
//----------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProjects', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProject1', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject1(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProject2', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject2(),
    });
  });
});
//---------------------------------------------------------------------------------------------------------------------------

router.get('/mobitelProject3', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject3(),
    });
  });
});
//--------------------------------------------------------------------------------------------------------------------------
router.get('/mobitelProject4', (_req, res) => {
  Posts.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    return res.status(200).json({
      success: true,
      changeProjectName: changeProject4(),
    });
  });
});
// ---------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------

// let projectName = 'All Projects';

// async function changeProject(){
//   projectName = 'All Projects';
//   console.log(projectName);
// }

// async function changeProject1(){
//   projectName = 'Other Project';
//   console.log(projectName);
// }

// async function changeProject2() {
//   projectName='Covid P3';
//   console.log(projectName);
// }

// async function changeProject3() {
//   projectName='Huawei IBBE P1';
//   console.log(projectName);
// }

// async function changeProject4() {
//   projectName='ZTE BBE 2020';
//   console.log(projectName);
// }

//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

function getProjectScopeData(posts) {
  
  var scopeData = [];

  if ( projectName === 'All Projects' ) {
    scopeData = posts.filter((obj) => (obj.ProjectScope))[0].ProjectScope;
  } else  {
    scopeData = posts.filter((obj) => ((obj.ProjectName) === projectName)).filter((obj) => (obj.ProjectScope))[0].ProjectScope;
  }

  console.log(projectName);
  console.log(scopeData);
  console.log(projectName);
  return scopeData;
 }
//---------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

module.exports = router;
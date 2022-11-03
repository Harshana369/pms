const router = require("express").Router();
const Posts = require("../models/Posts");

router.post('/post/save',(req,res)=>{

  let newPost = new Posts(req.body);

  newPost.save((err) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:"Post Saved Successfully"
    });
  });
});

//get post -----------------------------------------

router.get('/posts',(req,res) =>{
  Posts.find().exec((err,posts) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }

    const MobiAug = posts.filter((obj) => (obj["topic"] === 'Test3'))
    console.log(MobiAug);

    return res.status(200).json({
      success:true,
      existingPosts:posts
    });
  });
});


// Get a specific post

router.get("/post/:id",(req,res) =>{

  let postId = req.parms.id;

  Posts.findById(postId,(err,post) =>{
    if(err){
      return res.status(400).json({success:false, err});
    }
    
      return res.status(200).json({
        success:true,
        post
      });
  });
});

//update posts

router.put('/post/update/:id',(req,res) =>{
  Posts.findByIdAndUpdate(
    req.params.id,
    {
      $set:req.body
    },
    (err,post)=>{
      if(err){
        return res.status(400).json({error:err});
      }
      return res.status(200).json({
        success:"Updated Successfully"
      });
    }
  );
});

//delete post

router.delete('/post/delete/:id',(req,res) =>{
  Posts.findByIdAndRemove(req.params.id).exec((err,deletedPost) =>{
    if(err) return res.status(400).json({
      message:"Delete Unsuccessful",err
    });

    return res.json({
      message:"Delete Successful",deletedPost
    });
  });
});

module.exports = router;

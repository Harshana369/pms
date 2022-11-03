const router = require("express").Router();
const Sites = require("../models/sites");

//get post

router.get('/sites',(req,res) =>{
  Sites.find().exec((err,sites) =>{
    if(err){
      return res.status(400).json({
        error:err
      });
    }
    return res.status(200).json({
      success:true,
      sites:sites
    });
  });
});

module.exports = router;
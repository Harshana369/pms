const router = require("express").Router();
const Users = require("../models/users");
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');




// -------------------- Register --------------------------------------------------------------------

router.post('/users/register', async (req,res)=>{
  console.log(req.body)
  const newPassword = await bcrypt.hash(req.body.password, 10)
  let newUSer = new Users({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
			email: req.body.email,
			password: newPassword,
  });
  newUSer.save((err) =>{
    if(err){
      res.json({ status: 'error', error: 'Duplicate email' })
    }
    res.json({ status: 'ok' })
  });
});


// -------------------- Login ---------------------------------------------------------------------

router.post('/users/login', async (req, res) => {
  console.log(req.body)

    let user = await Users.findOne({
      email: req.body.email,
      password: req.body.password
    })

    if (!user) {
		return { status: 'error', error: 'Invalid login' }
	  }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        'secret123'
      )
  
      return res.json({ status: 'ok', user: token })
    } else {
      return res.json({ status: 'error', user: false })
    }
})





router.get('/users/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await Users.findOne({ email: email })

		return res.json({ status: 'ok', quote: user.quote })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})



router.post('/users/quote', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await Users.updateOne(
			{ email: email },
			{ $set: { quote: req.body.quote } }
		)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

module.exports = router;

const express = require('express');
const router = express.Router();
const user = require('../models/User');
const { models } = require('mongoose');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcrypt');



router.post("/createuser" ,
    [body('email',"Incorrect Email").isEmail(),
    body('name',"Incorrect name").isLength({min:1}),
    body('password',"Incorrect password").isLength({ min: 5 })],
    async (req,res)=>{

        const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

    const salt = await bcrypt.genSalt(10);
    let securePassword = await bcrypt.hash(req.body.password,salt);
    try{
        await user.create({
            // name:"chhotu",
            // password:"abc",
            // location:"Bihar",
            // email:"Abc@123.com"
            name:req.body.name,
            password: securePassword,
            location:req.body.location,
            email:req.body.email
        })
        res.json({success:true});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
})
module.exports = router;
const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { models } = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const JwsScreate = "anhdndfkvimdjhndhnd!#hdsjdmn^$Gt%^";
const bcrypt = require('bcrypt')


router.post(
  "/loginuser",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password cannot be blank").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;

    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Please signup !..." });
        
      }
      const passwordCompare = await bcrypt.compare(req.body.password,userData.password);
      if (!passwordCompare) {
        return res.status(400).json({ errors: "Password can't match!..." });
        
      }
      const data ={
        user:{
          id:userData.id
        }
      }
      const authToken = jwt.sign(data,JwsScreate);
      return res.json({success:true,authToken:authToken});
      alert("Login success");
    } catch (error) {
      console.log(err);
      res.json({ success: false });
    }
  }
);
module.exports = router;

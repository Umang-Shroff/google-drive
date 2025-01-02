const express = require("express");
const bcrypt = require("bcrypt")
const router = express.Router();
const userModel = require('../models/user.model')

router.get("/test", (req, res) => {
  res.send("Test route");
});

router.post("/register", async(req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log({ name, email, password });

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = await userModel.create({
        username:name,
        email,
        password:hashedPassword,
      })
      res.status(200).json({newUser})

    } catch (error) {
      console.log("Error at register: ", error);
      res.status(500).json({ error: error });
    }
  }
);

module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router();
const userModel = require("../models/user.model");

router.get("/test", (req, res) => {
  res.send("Test route");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log({ name, email, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username: name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({ newUser });
  } catch (error) {
    console.log("Error at register::: ", error);
    return res.status(500).json({ error: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email: email });
    if (!findUser) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }

    const token = jwt.sign({
      userId: findUser._id,
      email: findUser.email,
      username: findUser.username,
    },
      process.env.JWT_SECRET,
    )

    res.cookie('token', token)
    res.send("Logged in")

  } catch (error) {
    console.log("Error at Login::: ", error)
    return res.status(500).json({ error: error })
  }
});

module.exports = router;

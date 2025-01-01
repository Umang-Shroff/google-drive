const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Test route");
});

router.post("/register", (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log({ name, email, password });
      res.status(200).json({ username: name, email: email, success: true });
    } catch (error) {
      console.log("Error at register: ", error);
      res.status(500).json({ error: error });
    }
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config")
const fileModel = require("../models/files.model")

router.post("/upload", upload.single("file"), async(req,res)=>{
    
})

module.exports = router
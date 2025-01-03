const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config")
const fileModel = require("../models/files.model")
const authMiddleware = require("../middlewares/auth");
const auth = require("../middlewares/auth");

router.get("/home",authMiddleware, async(req,res)=>{
    const userFiles = await fileModel.find({
        user: req.user.userId
    })
})

router.post("/upload",authMiddleware, upload.single("file"), async(req,res)=>{
    
    const newFile = await fileModel.create({
        path: req.file.path,
        originalName: req.file.originalname,
        user: req.user.userId
    })
})

router.get("/download/:path", authMiddleware, async(req,res)=>{
    const loggedInUser = req.user.userId;
    const path = req.params.path;

    const file = await fileModel.findOne({
        user: loggedInUser,
        path: path
    })

    if(!file){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    const signedUrl = await FirebaseFirestore.storage().bucket().file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 60 * 1000,
    })

    res.redirect(signedUrl[0])
})

module.exports = router
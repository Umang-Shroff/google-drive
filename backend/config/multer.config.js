const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("./firebase.config");

const storage = firebaseStorage({
    credentials: firebase.credential.cert("Certified User"),
})

const upload = multer({
    storage: storage,
})

module.exports = upload;
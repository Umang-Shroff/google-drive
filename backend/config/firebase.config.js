const Firebase = require("firebase-admin")

const firebase = Firebase.initializeApp({
    credential: Firebase.credential.cert("Certified User"),
})

module.exports = Firebase
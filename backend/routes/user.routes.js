const express = require('express');
const router = express.Router();

router.get('/test',(req,res)=>{
    res.send("Test route");
})

router.post('/register',(req,res)=>{
    const {name, email, password} = req.body; 
    
})

module.exports = router;
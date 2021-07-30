const router = require('express').Router();
const CryptoJS = require('crypto-js')
const User = require("../models/User")
const verify  = require("../verifyToken")


// Update

router.put("/:id", verify, async (req, res) =>  {
    if(req.user.id === req.params.id || req.user.isAdmin ){
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY ).toString()
        } 
        try {
        
            const updatedUser = await User.findByIdAndUpdate(req.password.id, {
                $set : req.body,
            },
            {   new: true })
            res.status(200).json(updatedUser);

        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("You can update only your account")
    }

    
})


//Delete


//Get


// Get all


// get user stats

module.exports = router;
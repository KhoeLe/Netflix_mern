const router = require('express').Router();
const CryptoJS = require('crypto-js')
const User = require('../models/User')

//register routes
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY ).toString(),
    })
    console.log(newUser)
   try {
        //save db
    const user = await newUser.save();
    
    res.status(200).json(user);

   } catch (error) {
       res.status(500).json(error)
   }
})

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json("Wrong user name & password")
        console.log(user)
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

        originalPassword = req.body.password
            req.status(401).json("Wrong user name & password")
        const {password , ...info} = user._doc;
        res.status(200).json(info);
    } catch (error) {
        return res.status(500).json(error)
    }
})


module.exports = router;
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
// creating out signature for jwt token (it should add in env or config file)
const JWTsecreteKey = "ojakwfo43f9$nkwf"

// Signup API---------------------------------------------------------------------------------------------------
router.post('/signup', [body('firstname', 'Firstname length should be 3 characters').isLength({ min: 3 }), body('lastname', 'Lastame length should be 3 characters').isLength({ min: 3 }), body('email', 'Enter valid email').isEmail(), body('password', 'Please enter strong password, use cimbination of alphabates, special characters and number').isLength({ min: 6 }).isStrongPassword()], async (req, res) => {
    let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({success, errors: result.array() });
    }
    try {
        // Checking if user/email already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Email is already exist" })
        }

        // hashing password with adding salt using bcryptjs\
        const salt = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: securePassword,
        })
        // Sending JWT token after signup
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWTsecreteKey)

        success=true;
        res.json({success, authToken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Error")
    }
})


// Login API-------------------------------------------------------------------------------
router.post('/login', [body('email', 'Enter valid email').isEmail(), body('password', 'Password Cannot be blank').exists()], async (req, res) => {
    let success=false;
    
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.send({success, errors: result.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        // checking user is exist or not
        if (!user) {
            return res.status(400).json({success, error: "Entered valid email and password" })
        }
        // password checking
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({success, error: "Entered valid email and password" })
        }
        const data = {
            user: {
                id: user.id,
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email

            }
        }
        
        const authToken = jwt.sign(data, JWTsecreteKey)
        success=true;
        res.json({ success, authToken, data })

    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
        
    }
})


// Getting user details after authentication
// created fetchuser middlware to authenticate
router.post('/getuser',fetchuser, async (req, res) => {
   
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        success=true
        // res.send(user)
        res.json({user,success})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
        // res.json({error,success})

    }
})

// Update user API--------------------------------------------------------------

router.put('/updateuser/:id',fetchuser, async (req, res) => {
    const{firstname, lastname,email}=req.body;
    try {
        const updatedUser={};
        if(firstname){updatedUser.firstname=firstname}
        if(lastname){updatedUser.lastname=lastname}
        if(email){updatedUser.email=email}

        const userId = req.user.id;
        if (req.params.id !== userId){
        return res.status(401).send("Not allowed")

        }
        const user = await User.findByIdAndUpdate(userId,{$set:updatedUser},{new:true})
        success=true
        res.json({user,success})

        // res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")

    }
})






module.exports = router
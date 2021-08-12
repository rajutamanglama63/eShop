const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password) {
            return res.status(400).json({msg : "All fields are required"});
        }

        let user = await User.findOne({email : email});
        if(user) {
            return res.status(400).json({msg : "User already exist."});
        }

        if(password.length < 6) {
            return res.status(400).json({msg : "Password must be atleast 6 character long."});
        }

        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password : hassedPassword
        });

        await user.save();

        // signing jwt token for authentication
        const accessToken = createAccessToken({_id : user._id, email : user.email, name : user.name});
        const refreashToken = createRefreashToken({_id : user._id, email : user.email, name : user.name});

        res.cookie('refreashToken', refreashToken, {
            httpOnly : true,
            path : '/auth/refreash_token'
        });

        res.json(accessToken);

    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
});

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({msg : "All fields are required."});
        }

        let user = await User.findOne({email : email});
        if(!user) {
            return res.status(400).json({msg : "User does not exist."});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg : "Invalid credentials."});
        }

        // signing jwt token for authentication
        const accessToken = createAccessToken({_id : user._id, email : user.email, name : user.name, role : user.role});
        const refreashToken = createRefreashToken({_id : user._id, email : user.email, name : user.name, role : user.role});

        res.cookie("refreashToken", refreashToken, {
            httpOnly : true,
            path : '/auth/refreash_token'
        });
        
        res.send(accessToken);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
});

router.post('/logout', (req, res) => {
    try {
        res.clearCookie("refreashToken", {path : "/auth/refreash_token"});
        res.json({msg : "Logged out."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message})
    }
});

router.get('/refreash_token', (req, res) => {
    try {
        const rf_token = req.cookies.refreashToken;
        if(!rf_token) {
            return res.status(400).json({msg : "Please login or register."});
        }
        
        jwt.verify(rf_token, process.env.REFREASH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg : "Please login or register."});

            const accessToken = createAccessToken({_id : user._id, email : user.email, name : user.name, role : user.role});

            res.json({user, accessToken});
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
});

// USER LISTS
router.get('/users', async (req, res) => {
    try {
        const usersList = await User.find();
        if(usersList === "") {
            return res.status(200).json({msg : "User list is empty."});
        } 
    
        res.status(200).json(usersList);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
})

// USER INFORMATION FOR USER
router.get('/user_info', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) return res.status(400).json({msg : "User does not exist."});

        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
});

// USER DETAIL FOR ADMIN
router.get('/user/:id', async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
})

// DELETE USER
router.delete('/user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({msg : "User deleted successfully."});
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
})

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : '1d'});
};

const createRefreashToken = (user) => {
    return jwt.sign(user, process.env.REFREASH_TOKEN_SECRET, {expiresIn : '7d'});
};

module.exports = router;
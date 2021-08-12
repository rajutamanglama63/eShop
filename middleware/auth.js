const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if(!token) return res.status(400).json({msg : "Authentication failed. Access denied"});

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg : "Authentication failed. Access denied"});

            req.user = user;

            next();
        });
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
};

module.exports = auth;
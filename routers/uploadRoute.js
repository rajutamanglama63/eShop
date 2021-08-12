const express = require("express");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const fs = require("fs");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

dotenv.config();

const router = express.Router();

// cloudinary configuration for uploading images in cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

// only admin can upload image in cloudinary
router.post('/upload', (req, res) => {
    try {
        // const pic = req.files;
        // console.log(pic);

        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({msg : "No files were uploaded."});
        }

        const file = req.files.file;
        // 1024*1024*1 = 1mb, 1024*1024*2 = 2mb
        if(file.size > 1024*1024) {
            removeTem(file.tempFilePath);
            return res.status(400).json({msg : "File size is too large. It must not be grater than 1mb."});
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTem(file.tempFilePath);
            return res.status(400).json({msg : "Invalid file format."});
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder : "test"}, async (error, result) => {
            if(error) throw error;

            removeTem(file.tempFilePath);

            res.status(200).json({ public_id : result.public_id, url : result.secure_url });
        })


    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

// only admin can delete image in cloudinary
router.post('/destroy', (req, res) => {
    try {
        const {public_id} = req.body;

        if(!public_id) return res.status(400).json({msg : "No images selected."});

        cloudinary.v2.uploader.destroy(public_id, (error, result) => {
            if(error) throw error;

            res.status(200).json({msg : "Image deleted successfully."});
        });
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

// every time after we upload file one folder is created automatically. To remove it we will create a function.
const removeTem = (path) => {
    fs.unlink(path, error => {
        if(error) throw error;
    })
}


module.exports = router;
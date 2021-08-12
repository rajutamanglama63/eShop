const express = require("express");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const { findById } = require("../models/categoryModel");
const Category = require("../models/categoryModel");

const router = express.Router();

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

router.post('/create_category',  async (req, res) => {
    try {
        // if user have role = 1 ---> admin,
        // Only admin have access to create, delete, update category
        const {name} = req.body;

        const category = await Category.findOne({name : name});
        if(category) return res.status(400).json({msg : "This category already exist."});

        const newCategory = new Category({name});

        await newCategory.save();
        
        res.status(200).json(newCategory);

    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

router.delete('/delete_category/:id',  async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);

        res.json({msg : "Category successfully deleted."});
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

router.put('/update_category/:id',  async (req, res) => {
    try {
        const {name} = req.body;

        await Category.findOneAndUpdate({_id : req.params.id}, {name});

        res.json({msg : "Category updated successfully."});
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
})

module.exports = router;
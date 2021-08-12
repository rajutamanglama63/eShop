const express = require("express");
const Product = require("../models/productModel");
const auth = require("../middleware/auth");


const router = express.Router();

// filtering, sorting and pagenating by using class

// class APIfeatures {
//     constructor (query, queryString) {
//         this.query = query;
//         this.queryString = queryString;
//     }

//     filterng() {
//         const queryObj = {...this.queryString} //queryString = req.query

//        const excludedFields = ['page', 'sort', 'limit']
//        excludedFields.forEach(el => delete(queryObj[el]))
       
//        let queryStr = JSON.stringify(queryObj)
//        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    //    this.query.find(JSON.parse(queryStr))
         
    //    return this;
    // }
    // sorting() {
    //     if(this.queryString.sort){
    //         const sortBy = this.queryString.sort.split(',').join(' ')
    //         this.query = this.query.sort(sortBy)
    //     }else{
    //         this.query = this.query.sort('-createdAt')
    //     }

    //     return this;
    // }
    // pagenating() {
    //     const page = this.queryString.page * 1 || 1
    //     const limit = this.queryString.limit * 1 || 9
    //     const skip = (page - 1) * limit;
    //     this.query = this.query.skip(skip).limit(limit)
    //     return this;
    // }
// }

router.get('/products', async (req, res) => {
    try {
        // console.log(req.query);
        // const features = new APIfeatures(Product.find(), req.query).filtering().sorting().paginating();
        // const products = await features.query;

        const products = await Product.find();
        
        res.status(200).json(products);
    } catch (error) {
        console.log(error)
        res.status(500).json({msg : error.message});
    }
});

router.get('/product/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
})

router.post('/product/create', async (req, res) => {
    try {
        const {product_id, uid, title, price, description, images, category, countInStock, content} = req.body;
        if(!images) return res.status(400).json({msg : "No images uploaded."});

        const product = await Product.findOne({product_id : product_id});
        if(product) return res.status(400).json({msg : "Product already exist."});

        const newProduct = new Product({
            product_id,
            title : title.toLowerCase(), 
            price,
            description,
            images,
            category,
            countInStock,
            uid,
            // qty,
            content
        });

        await newProduct.save();
        res.status(200).json({msg : "Product successfully created.", newProduct});
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});


// UPDATE PRODUCT
router.patch('/product/update/:id', async (req, res) => {
    try {
        const {title, price, description, images, category, countInStock, content} = req.body;
        if(!images) return res.status(400).json({msg : "No images uploaded."});

        const productToBeUpdated = {title : title.toLowerCase(), price, description, images, category, countInStock, content};

        const updatedProduct = await Product.findOneAndUpdate({_id : req.params.id}, productToBeUpdated, {new : true});

        res.status(200).json({msg : "Product successfully updated.", updatedProduct});
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

router.delete('/product/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({msg : "Product successfully deleted."});
    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

module.exports = router;
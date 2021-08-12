const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    title : {
        type : String,
        trim : true,
        required : true,
    },
    price : {
        type : Number,
        trim : true,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    images : {
        type : Object,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    countInStock : {
        type : Number,
        required : true
    },
    qty : {
        type : Number,
        default : 0,
    },
    uid : {
        type : String,
    },
    checked : {
        type : Boolean,
        default : false
    }
}, {
    timestamps : true 
});

const Prouduct = mongoose.model("product", productSchema);

module.exports = Prouduct;
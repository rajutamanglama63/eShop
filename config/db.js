const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex : true,
            useFindAndModify : false,
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log("MongoDB connection established.");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
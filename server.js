const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const userRoute = require("./routers/userRoute");
const categoryRoute = require("./routers/categoryRoute");
const uploadRoute = require("./routers/uploadRoute");
const productRoute = require("./routers/productRoute");

dotenv.config();
const Port = process.env.PORT || 4000;

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(fileUpload({
    useTempFiles: true

}));

app.use('/auth', userRoute);
app.use('/api', categoryRoute);
app.use('/api', uploadRoute);
app.use('/api', productRoute);

app.listen(Port, () => {
    console.log(`Server running on port http://localhost:${Port}`);
});
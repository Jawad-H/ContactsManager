const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
app.use(express.json());
const authRoute = require("./routes/auth");
const contactRoute = require("./routes/contact");
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_DB, () => {
    console.log("mongodb connected");
});
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.listen(5000, () => {
    console.log("Listening on port 5000");
});

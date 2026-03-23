import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"
import cors from "cors"
import bookRoute from "./routes/book.js"
import AuthProduct from "./routes/products.js"

dotenv.config({ path: "../.env" });

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());


// DB connection
app.use("/api/products", AuthProduct)
app.use("/api/book", bookRoute)
app.use("/api/auth", authRoute)





// route
app.get("/", (req, res) => {
    res.send("Server is Running");
});


mongoose.connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));




// server start
app.listen(PORT, () => {
    console.log(`Server app port ${PORT}`);
});
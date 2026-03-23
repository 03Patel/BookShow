import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    id: Number,
    title: String,
    name: String,
    price: Number,
    category: String,
    image: String,
    free: Boolean
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);
import mongoose from "mongoose";
import { Router } from "express";
import Book from "../models/Book.js";


const router = Router();

router.get("/", async (req, res) => {

    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (erorr) {
        res.status(500).json({ message: "server error" })
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params

        const product = await Book.findById(id);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: "Product was not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "server error" });
    }
})

export default router
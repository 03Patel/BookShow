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

export default router
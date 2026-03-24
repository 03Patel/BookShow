
import mongoose from "mongoose";
import { Router } from "express";

import Product from "../models/Product.js";
const router = Router()

router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (erorr) {
        res.status(500).json({ message: "server error" })
    }
})

router.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id);
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

export default router;
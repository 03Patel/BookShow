
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

export default router;
import express from "express";
import { getCategories, getProductsById, listproduct } from "../controllers/public.js"; // ✅ include .js

const productRout = express.Router();
 
productRout.get("/products", listproduct);
productRout.get("/products/:id", getProductsById);

productRout.get("/categories", getCategories);



export default productRout;

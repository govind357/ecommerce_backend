import express from "express";
import { getCategories, getProductsById, listproduct } from "../controllers/public.js"; // ✅ include .js
import { filltercat } from "../controllers/public.js";
const productRout = express.Router();
 
productRout.get("/products", listproduct);
productRout.get("/products/:id", getProductsById);

productRout.get("/categories", getCategories);

productRout.get('/categorypro/:id', filltercat);


export default productRout;

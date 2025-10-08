import express from "express";
import { loginfunction, register, userSessionChecking } from "../controllers/register.js";
import { addcart, createOrder, deleteCart, editCart, getAllOrder, getCart, getTheOrder, removeFromCart } from "../controllers/usercontroller.js";
// import { addToCart, getCart, removeFromCart } from "../controllers/usercontroller.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', loginfunction)
router.use(userSessionChecking)
router.delete("/cart", deleteCart)
router.post('/cart/:id', addcart)
router.delete('/cart/remove/:id', removeFromCart)
router.put("/cart/edit/:id", editCart)
router.get('/cart', getCart)

router.post('/orders', createOrder);
router.get('/orders', getAllOrder)
router.get("/orders/:id", getTheOrder);


export default router
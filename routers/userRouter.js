import express from "express";
import { loginfunction, register, userSessionChecking } from "../controllers/register.js";
import { addcart, createOrder, deleteCart, editCart, getAllOrder, getCart, getTheOrder, logout, removeFromCart } from "../controllers/usercontroller.js";
// import { addToCart, getCart, removeFromCart } from "../controllers/usercontroller.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', loginfunction)
router.get("/session", (req, res) => {
  if (req.session.userid) {
    return res.json({
      loggedIn: true,
      userid: req.session.userid,
      username: req.session.username,
    });
  } else {
    return res.json({ loggedIn: false });
  }
});
router.use(userSessionChecking)
router.delete("/cart", deleteCart)  
router.post('/cart/:id', addcart)
router.delete('/cart/remove/:id', removeFromCart)
router.put("/cart/edit/:id", editCart)
router.get('/cart', getCart)

router.post('/orders', createOrder);
router.get('/orders', getAllOrder)
router.get("/orders/:id", getTheOrder);
router.post("/logout", logout)


export default router